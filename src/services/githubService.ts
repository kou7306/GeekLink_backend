import prisma from "../config/prisma";
import axios from "axios";
import { graphql } from "../graphql/graphql";
import {
  getRepositoryQuery,
  getContributionsQuery,
  getActivityLogQuery,
  getUseLanguageQuery,
} from "../graphql/queries/getUserGithub";
import {
  repositoryResponse,
  contributionResponse,
  MonthContribution,
  activityResponse,
} from "../types/githubInterface";

export const githubCallBackService = async (
  uuid: string,
  code: string,
  client_id: string,
  client_secret: string
): Promise<void> => {
  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: client_id,
        client_secret: client_secret,
        code: code,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const accessToken = tokenResponse.data.access_token;

    await prisma.users.update({
      where: { user_id: uuid },
      data: {
        github_access_token: accessToken,
      },
    });

    await saveGithubUser(accessToken, uuid);
  } catch (error) {
    console.error("Failed to save access token:", error);
  }
};

export const saveGithubUser = async (accessToken: string, uuid: string) => {
  try {
    const query = `
        query {
          viewer {
            login
          }
        }
      `;

    const userResponse = await axios.post(
      "https://api.github.com/graphql",
      JSON.stringify({ query }),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const githubUser = userResponse.data.data.viewer.login;

    await prisma.users.update({
      where: { user_id: uuid },
      data: {
        github: githubUser,
      },
    });
  } catch (error) {
    console.error("Failed to fetch or save GitHub user info:", error);
  }
};

// usersからgithubとgithub_access_tokenの値を取得
export const getUserGithubInfo = async (uuid: string) => {
  const user = await prisma.users.findUnique({
    where: { user_id: uuid },
    select: {
      github: true,
      github_access_token: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const { github, github_access_token } = user;

  return {
    username: github,
    token: github_access_token,
  };
};

// ユーザーのリポジトリ情報を取得(最新10件)
export const getRepostiroryService = async (
  username: string | null,
  token: string | null
) => {
  const response = await graphql(getRepositoryQuery, { username }, token);

  const repositories = (
    response as repositoryResponse
  ).user.repositories.edges.map((edge) => {
    const { name, stargazerCount, defaultBranchRef, languages, updatedAt } =
      edge.node;

    const languageData = languages.edges.map((lang) => ({
      name: lang.node.name,
      size: lang.size,
    }));

    // 各リポジトリの言語量を求め, 言語の使用割合を計算
    const totalSize = languageData.reduce((sum, lang) => sum + lang.size, 0);

    const languagePercentage = languageData.map((lang) => ({
      name: lang.name,
      size: lang.size,
      percentage: totalSize > 0 ? (lang.size / totalSize) * 100 : 0,
    }));

    const commitCount = defaultBranchRef?.target?.history?.totalCount || 0;

    return {
      name,
      stargazerCount,
      commitCount,
      languages: languagePercentage,
      updatedAt,
    };
  });

  return repositories;
};

// ユーザーのコントリビューション数を取得
export const getContributionService = async (
  username: string | null,
  token: string | null
) => {
  const response = await graphql(getContributionsQuery, { username }, token);

  const contributionCalendar = (response as contributionResponse).user
    .contributionsCollection.contributionCalendar;

  const { totalContributions, months, weeks } = contributionCalendar;

  const monthlyContributions: { [monthName: string]: number } = {};

  weeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      const contributionDate = new Date(day.date);
      const monthName = contributionDate.toLocaleString("en", {
        month: "short",
      });
      const year = contributionDate.getFullYear();
      monthlyContributions[`${monthName} ${year}`] =
        (monthlyContributions[`${monthName} ${year}`] || 0) +
        day.contributionCount;
    });
  });

  const date = new Date();
  const currentMonthName = date.toLocaleString("en", { month: "short" });
  const currentYear = date.getFullYear();
  const currentKey = `${currentMonthName} ${currentYear}`;

  const updatedMonths: MonthContribution[] = months.slice(1).map((month) => ({
    name: month.name,
    year: month.year,
    contributions: monthlyContributions[`${month.name} ${month.year}`] || 0,
  }));

  updatedMonths.push({
    name: currentMonthName,
    year: currentYear,
    contributions: monthlyContributions[currentKey] || 0,
  });

  return {
    totalContributions,
    months: updatedMonths,
  };
};

// ユーザーのアクティビティログを取得
export const getActivityLogService = async (
  username: string | null,
  token: string | null,
  hoursBack: number
) => {
  // 現在のUTC時間から指定した時間数を引き算してISO形式を取得
  const sinceDate = new Date();
  sinceDate.setUTCHours(sinceDate.getUTCHours() - hoursBack); // UTCでの時間を計算
  const sinceISOString = sinceDate.toISOString(); // ISO形式に変換
  console.log(typeof sinceISOString);

  // GraphQLクエリを実行
  const response = await graphql(
    getActivityLogQuery,
    { username, since: sinceISOString }, // ここでsinceをISO形式で渡す
    token
  );

  // 期待されるレスポンス形式を確認
  const typedResponse = response as activityResponse;

  if (!typedResponse || !typedResponse.user) {
    throw new Error("Invalid response from GitHub API");
  }

  const activities: any[] = [];

  // コミットの情報を追加
  typedResponse.user.repositories.edges
    .filter((edge) => edge.node.owner.login === username && !edge.node.isFork)
    .forEach((edge) => {
      const node = edge.node;
      const commits = node.defaultBranchRef.target.history.edges.map(
        (commit: {
          node: { message: string; committedDate: string; url: string };
        }) => ({
          type: "commit",
          repository: node.name,
          message: commit.node.message,
          date: commit.node.committedDate,
          url: commit.node.url,
        })
      );
      activities.push(...commits);
    });

  // プルリクエストの情報を追加
  typedResponse.user.contributionsCollection.pullRequestContributionsByRepository.forEach(
    (repo) => {
      const repoName = repo.repository.name;
      repo.contributions.nodes.forEach((contribution: any) => {
        activities.push({
          type: "pullRequest",
          repository: repoName,
          title: contribution.pullRequest.title,
          url: contribution.pullRequest.url,
          mergedAt: contribution.pullRequest.mergedAt,
          date: contribution.pullRequest.createdAt,
        });
      });
    }
  );

  // イシューの情報を追加
  typedResponse.user.issues.edges.forEach((edge: { node: any }) => {
    const issue = edge.node;
    activities.push({
      type: "issue",
      repository: issue.repository.name,
      title: issue.title,
      url: issue.url,
      createdAt: issue.createdAt,
      closedAt: issue.closedAt,
      date: issue.createdAt,
    });
  });

  // レビューの情報を追加
  typedResponse.user.contributionsCollection.pullRequestContributionsByRepository.forEach(
    (repo) => {
      repo.contributions.nodes.forEach((contribution: any) => {
        contribution.pullRequest.reviews.nodes.forEach((review: any) => {
          activities.push({
            type: "review",
            pullRequestTitle: contribution.pullRequest.title,
            repository: repo.repository.name,
            reviewAuthor: review.author.login,
            reviewBody: review.body,
            date: review.submittedAt,
          });
        });
      });
    }
  );

  // アクティビティを日付でソート（新しい順）
  const sortedActivities = activities.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return sortedActivities;
};

// ユーザーの使用言語量(割合)を取得
export const getUseLanguagesService = async (
  username: string | null,
  token: string | null
) => {
  const response = await graphql(getUseLanguageQuery, { username }, token);

  const languages = (response as repositoryResponse).user.repositories.edges
    .map((edge: any) => edge.node)
    .filter((repo: any) => repo.owner.login === username && !repo.isFork);

  const languageMap: Record<string, number> = {};

  // 言語の使用量を計算
  languages.forEach((repo) => {
    if (repo.languages.edges.length > 0) {
      repo.languages.edges.forEach(
        (edge: { node: { name: string }; size: number }) => {
          const name = edge.node.name;
          const size = edge.size;

          if (languageMap[name]) {
            languageMap[name] += size;
          } else {
            languageMap[name] = size;
          }
        }
      );
    }
  });

  const totalSize = Object.values(languageMap).reduce(
    (sum, size) => sum + size,
    0
  );

  // 言語の使用割合を計算
  const languagePercentage = Object.entries(languageMap).map(
    ([name, size]) => ({
      name,
      size,
      percentage: totalSize > 0 ? (size / totalSize) * 100 : 0,
    })
  );

  languagePercentage.sort((a, b) => b.percentage - a.percentage);

  // 言語の種類を6種類以下に制限
  const topLanguages = languagePercentage.slice(0, 6);

  return topLanguages;
};
