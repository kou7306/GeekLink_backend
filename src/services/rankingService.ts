import prisma from "../config/prisma";


export const getDailyRankingService = async () => {
  try {
    const contribution = await prisma.dailyGithubContributionRanking.findMany({
      orderBy: {
        rank: 'desc'
      }
    });

    const star = await prisma.dailyGithubContributionStarRanking.findMany({
      orderBy: {
        rank: 'desc'
      }
    });

    const qiita = await prisma.dailyQiitaRanking.findMany({
      orderBy: {
        rank: 'desc'
      }
    });

    // IDがBigInt型の為, string型に変換
    const formattedContribution = contribution.map((item) => ({
      ...item,
      id: item.id.toString(),
    }));

    const formattedStar = star.map((item) => ({
      ...item,
      id: item.id.toString(),
    }));

    const formattedQiita = qiita.map((item) => ({
      ...item,
      id: item.id.toString(),
    }));

    const result = {
      contribution: formattedContribution,
      star: formattedStar,
      qiita: formattedQiita
    }

    return result;
  } catch(error: any) {
    throw new Error(error.message);
  }
};

export const getWeeklyRankingService = async () => {
  try {
    const contribution = await prisma.weeklyGithubContributionRanking.findMany({
      orderBy: {
        rank: 'desc'
      }
    });

    const star = await prisma.weeklyGithubContributionStarRanking.findMany({
      orderBy: {
        rank: 'desc'
      }
    });

    const qiita = await prisma.weeklyQiitaRanking.findMany({
      orderBy: {
        rank: 'desc'
      }
    });

    // IDがBigInt型の為, string型に変換
    const formattedContribution = contribution.map((item) => ({
      ...item,
      id: item.id.toString(),
    }));

    const formattedStar = star.map((item) => ({
      ...item,
      id: item.id.toString(),
    }));

    const formattedQiita = qiita.map((item) => ({
      ...item,
      id: item.id.toString(),
    }));

    const result = {
      contribution: formattedContribution,
      star: formattedStar,
      qiita: formattedQiita
    }

    return result;
  } catch(error: any) {
    throw new Error(error.message);
  }
};

export const getMonthlyRankingService = async () => {
  try {
    const contribution = await prisma.monthlyGithubContributionRanking.findMany({
      orderBy: {
        rank: 'desc'
      }
    });

    const star = await prisma.monthlyGithubContributionStarRanking.findMany({
      orderBy: {
        rank: 'desc'
      }
    });

    const qiita = await prisma.monthlyQiitaRanking.findMany({
      orderBy: {
        rank: 'desc'
      }
    });

    // IDがBigInt型の為, string型に変換
    const formattedContribution = contribution.map((item) => ({
      ...item,
      id: item.id.toString(),
    }));

    const formattedStar = star.map((item) => ({
      ...item,
      id: item.id.toString(),
    }));

    const formattedQiita = qiita.map((item) => ({
      ...item,
      id: item.id.toString(),
    }));

    const result = {
      contribution: formattedContribution,
      star: formattedStar,
      qiita: formattedQiita
    }

    return result;
  } catch(error: any) {
    throw new Error(error.message);
  }
};