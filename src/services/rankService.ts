import { getUserGithubInfo } from "./githubService";
import { graphql } from "../graphql/graphql";
import { getTotalContributionsQuery } from "../graphql/queries/getUserGithub";
import { contributionResponse } from "../types/githubInterface";
import prisma from "../config/prisma";
import axios from "axios";

export const getUserRankService = async (uuid: string) => {
  try {
    // レベルの計算に必要な情報の取得
    // 総コントリビューション数の取得
    const { username, token } = await getUserGithubInfo(uuid);
    const contributionResponse = await graphql(
        getTotalContributionsQuery,
        { username },
        token
    );
    const contributions = (contributionResponse as contributionResponse).user.contributionsCollection.contributionCalendar.totalContributions;

    // Qiitaの総投稿数を取得
    const user = await prisma.users.findUnique({
      where: { user_id: uuid },
      select: {
          qiita_access_token: true,
          qiita: true,
      },
    });
  
    if (!user) {
    throw new Error("User not found");
    }

    const { qiita_access_token, qiita } = user;
  
    // ユーザーの投稿情報を取得
    const response = await axios.get(
      `https://qiita.com/api/v2/users/${qiita}/items`,
      {
        headers: {
        Authorization: `Bearer ${qiita_access_token}`,
        },
      }
    );
    const totalQiitaPosts = response.data.length;

    // イベントの投稿数を取得
    const ownerEvents = await prisma.event.findMany({
        where: uuid ? {owner_id: uuid} : undefined,
    });
    const totalOwnerEvents = ownerEvents.length;

    // タイムラインへの投稿数を取得
    const appPosts = await prisma.timeline.findMany({
        where: {user_id: uuid},
    });
    const totalAppPosts = appPosts.length;

    // レベルの計算ロジック
    const { level, nextLevelPoints } = calculateUserLevel(contributions, totalQiitaPosts, totalOwnerEvents, totalAppPosts);

    // レベル90以上の人
    console.log("Lv90目安：Level",calculateUserLevel(1900,7,3,50))
    // レベル70ぐらいの人
    console.log("Lv70目安：Level",calculateUserLevel(1300,5,2,45))
    // レベル50ぐらいの人
    console.log("Lv50目安：Level",calculateUserLevel(800,3,1,40))
    // レベル30ぐらいの人
    console.log("Lv30目安：Level",calculateUserLevel(400,2,0,30))
    // レベル10ぐらいの人
    console.log("Lv10目安：Level",calculateUserLevel(100,1,0,20))

    // ランクの計算ロジック
    const rank = calculateUserRank(level);

    const result = {
      rank: rank,
      level: level,
      nextLevelPoints: nextLevelPoints
    }

    return result;
  } catch(error: any) {
    throw new Error(error.message);
  }
}

const calculateUserLevel = (contributions: number, totalQiitaPosts: number, totalOwnerEvents: number, totalAppPosts: number): { level: number, nextLevelPoints: number } => {
  // 各要素に応じて経験値を計算
  // コントリビューション数が増えるほど経験値の上がり幅は小さく⇒コントリビューション数が少ない, 開発初心者は上がり幅を大きく 
  const contributionPoints = (() => {
    if (contributions >= 1500) {
      return contributions * 4.5;
    } else if (contributions >= 1000) {
      return contributions * 5.0;
    } else if (contributions >= 750) {
      return contributions * 6.0;
    } else if (contributions >= 500) {
      return contributions * 6.5;
    } else if (contributions >= 300) {
      return contributions * 7.0;
    } else if (contributions >= 150) {
      return contributions * 8.0;
    } else {
      return contributions * 9.0;
    }
  })();
  const qiitaPoints = totalQiitaPosts * 20.0;
  const eventPoints = totalOwnerEvents * 20.0;
  const postPoints = totalAppPosts * 6.0;

  const totalPoints = contributionPoints + qiitaPoints + eventPoints + postPoints;

  // 経験値の上限は10,000(1レベルあたり100)
  // 次のレベルまでの経験値も返す   
  const nextLevelPoints = Math.floor(1000 - (totalPoints % 1000));

  const level = Math.floor(totalPoints / 100);

  // レベルが100以上の場合は100を返す(最大が100)  
  if (level >= 100) {
    return {
      level: 100,
      nextLevelPoints: 0 
    }
  };

  const result = {
    level: level,
    nextLevelPoints: nextLevelPoints
  };

  return result;
};

const calculateUserRank = (level: number): string => {
  const ranks = ["Master", "DiamondI", "DiamondⅡ", "DiamondⅢ", "PlatinumI", "PlatinumⅡ", "PlatinumⅢ", "GoldI", "GoldⅡ", "GoldⅢ", "SilverI", "SilverⅡ", "SilverⅢ", "BronzeI", "BronzeⅡ", "BronzeⅢ", "Normal"];

  switch (true) {
    case (level >= 95):
      return ranks[0];
    case (level >= 90):
      return ranks[1];
    case (level >= 85):
      return ranks[2];
    case (level >= 80):
      return ranks[3];
    case (level >= 75):
      return ranks[4];
    case (level >= 70):
      return ranks[5];
    case (level >= 65):
      return ranks[6];
    case (level >= 60):
      return ranks[7];
    case (level >= 55):
      return ranks[8];
    case (level >= 50):
      return ranks[9];
    case (level >= 45):
      return ranks[10];
    case (level >= 40):
      return ranks[11];
    case (level >= 30):
      return ranks[12];
    case (level >= 20):
      return ranks[13];
    case (level >= 10):
      return ranks[14];
    case (level >= 5):
      return ranks[15];
    default:
      return ranks[16];
  }
};