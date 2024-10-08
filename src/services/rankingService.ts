import prisma from "../config/prisma";


const convertIdToString = (data: any[]) => {
  return data.map(item => ({
    ...item,
    id: item.id.toString()
  }));
};

const getTopRankingNames = async (topRanking: any[]) => {
  return await Promise.all(
    topRanking.map(async (ranking) => {
      const user = await prisma.users.findUnique({
        where: { user_id: ranking.user_id ?? undefined },
        select: { name: true, image_url:true },
      });
      return {
        ...ranking,
        name: user?.name || 'Unknown',
        image: user?.image_url || '/img/default_icon.png'
      };
    })
  );
};

// 全てのランキングを取得(上位5件)
export const getAllRankingService = async () => {
  try {
    const dailyContribution = await prisma.dailyGithubContributionRanking.findMany({
      where: {rank: {lte: 5}},
      orderBy: {rank: 'asc'}
    });
    const dailyStar = await prisma.dailyGithubContributionStarRanking.findMany({
      where: {rank: {lte: 5}},
      orderBy: {rank: 'asc'}
    });
    const dailyQiita = await prisma.dailyQiitaRanking.findMany({
      where: {rank: {lte: 5}},
      orderBy: {rank: 'asc'}
    });
    const weeklyContribution = await prisma.weeklyGithubContributionRanking.findMany({
      where: {rank: {lte: 5}},
      orderBy: {rank: 'asc'}
    });
    const weeklyStar = await prisma.weeklyGithubContributionStarRanking.findMany({
      where: {rank: {lte: 5}},
      orderBy: {rank: 'asc'}
    });
    const weeklyQiita = await prisma.weeklyQiitaRanking.findMany({
      where: {rank: {lte: 5}},
      orderBy: {rank: 'asc'}
    });
    const monthlyContribution = await prisma.monthlyGithubContributionRanking.findMany({
      where: {rank: {lte: 5}},
      orderBy: {rank: 'asc'}
    });
    const monthlyStar = await prisma.monthlyGithubContributionStarRanking.findMany({
      where: {rank: {lte: 5}},
      orderBy: {rank: 'asc'}
    });
    const monthlyQiita = await prisma.monthlyQiitaRanking.findMany({
      where: {rank: {lte: 5}},
      orderBy: {rank: 'asc'}
    });

    // IDがBigInt型の為, string型に変換
    const formatteddailyContribution = convertIdToString(await getTopRankingNames(dailyContribution));
    const formatteddailyStar = convertIdToString(await getTopRankingNames(dailyStar));
    const formatteddailyQiita = convertIdToString(await getTopRankingNames(dailyQiita));
    const formattedweeklyContribution = convertIdToString(await getTopRankingNames(weeklyContribution));
    const formattedweeklyStar = convertIdToString(await getTopRankingNames(weeklyStar));
    const formattedweeklyQiita = convertIdToString(await getTopRankingNames(weeklyQiita));
    const formattedmonthlyContribution = convertIdToString(await getTopRankingNames(monthlyContribution));
    const formattedmonthlyStar = convertIdToString(await getTopRankingNames(monthlyStar));
    const formattedmonthlyQiita = convertIdToString(await getTopRankingNames(monthlyQiita));

    const result = {
      dailyContribution: formatteddailyContribution,
      dailyStar: formatteddailyStar,
      dailyQiita: formatteddailyQiita,
      weeklyContribution: formattedweeklyContribution,
      weeklyStar: formattedweeklyStar,
      weeklyQiita: formattedweeklyQiita,
      monthlyContribution: formattedmonthlyContribution,
      monthlyStar: formattedmonthlyStar,
      monthlyQiita: formattedmonthlyQiita
    };

    return result;
  } catch(error: any) {
    throw new Error(error.message);
  }
}

// トップ画面用にデイリーコントリビューション数ランキング上位3人を取得
export const getTopRankingService = async () => {
  try {
    const topRanking = await prisma.dailyGithubContributionRanking.findMany({
      where: {rank: {lte: 3}},
      orderBy: {rank: 'asc'},
    });

    const formattedTopRanking = convertIdToString(await getTopRankingNames(topRanking));

    return formattedTopRanking;
  } catch(error: any) {
    throw new Error(error.message);
  }
};

// デイリーランキングを取得
export const getDailyRankingService = async () => {
  try {
    const contribution = await prisma.dailyGithubContributionRanking.findMany({
      orderBy: {
        rank: 'asc'
      }
    });

    const star = await prisma.dailyGithubContributionStarRanking.findMany({
      orderBy: {
        rank: 'asc'
      }
    });

    const qiita = await prisma.dailyQiitaRanking.findMany({
      orderBy: {
        rank: 'asc'
      }
    });

    // IDがBigInt型の為, string型に変換
    const formattedContribution = convertIdToString(await getTopRankingNames(contribution));
    const formattedStar = convertIdToString(await getTopRankingNames(star));
    const formattedQiita = convertIdToString(await getTopRankingNames(qiita));

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

// ウィークリーランキングを取得
export const getWeeklyRankingService = async () => {
  try {
    const contribution = await prisma.weeklyGithubContributionRanking.findMany({
      orderBy: {
        rank: 'asc'
      }
    });

    const star = await prisma.weeklyGithubContributionStarRanking.findMany({
      orderBy: {
        rank: 'asc'
      }
    });

    const qiita = await prisma.weeklyQiitaRanking.findMany({
      orderBy: {
        rank: 'asc'
      }
    });

    // IDがBigInt型の為, string型に変換
    const formattedContribution = convertIdToString(await getTopRankingNames(contribution));
    const formattedStar = convertIdToString(await getTopRankingNames(star));
    const formattedQiita = convertIdToString(await getTopRankingNames(qiita));

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

// マンスリーランキングを取得
export const getMonthlyRankingService = async () => {
  try {
    const contribution = await prisma.monthlyGithubContributionRanking.findMany({
      orderBy: {
        rank: 'asc'
      }
    });

    const star = await prisma.monthlyGithubContributionStarRanking.findMany({
      orderBy: {
        rank: 'asc'
      }
    });

    const qiita = await prisma.monthlyQiitaRanking.findMany({
      orderBy: {
        rank: 'asc'
      }
    });

    // IDがBigInt型の為, string型に変換
    const formattedContribution = convertIdToString(await getTopRankingNames(contribution));
    const formattedStar = convertIdToString(await getTopRankingNames(star));
    const formattedQiita = convertIdToString(await getTopRankingNames(qiita));

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