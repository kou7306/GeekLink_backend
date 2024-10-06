import prisma from "../config/prisma";


const convertIdToString = (data: any[]) => {
  return data.map(item => ({
    ...item,
    id: item.id.toString()
  }));
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
    const formatteddailyContribution = convertIdToString(dailyContribution);
    const formatteddailyStar = convertIdToString(dailyStar);
    const formatteddailyQiita = convertIdToString(dailyQiita);
    const formattedweeklyContribution = convertIdToString(weeklyContribution);
    const formattedweeklyStar = convertIdToString(weeklyStar);
    const formattedweeklyQiita = convertIdToString(weeklyQiita);
    const formattedmonthlyContribution = convertIdToString(monthlyContribution);
    const formattedmonthlyStar = convertIdToString(monthlyStar);
    const formattedmonthlyQiita = convertIdToString(monthlyQiita);

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
      where: {rank: {lte: 5}},
      orderBy: {rank: 'asc'},
    });

    const formattedTopRanking = convertIdToString(topRanking);

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
    const formattedContribution = convertIdToString(contribution);
    const formattedStar = convertIdToString(star);
    const formattedQiita = convertIdToString(qiita);

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
    const formattedContribution = convertIdToString(contribution);
    const formattedStar = convertIdToString(star);
    const formattedQiita = convertIdToString(qiita);

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
    const formattedContribution = convertIdToString(contribution);
    const formattedStar = convertIdToString(star);
    const formattedQiita = convertIdToString(qiita);

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