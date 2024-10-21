import { Request, Response } from "express";
import {
  getAllRankingService,
  getTopRankingService,
  getDailyRankingService,
  getWeeklyRankingService,
  getMonthlyRankingService,
} from "../services/rankingService";


// 全てのランキングを取得(上位5件)
export const getAllRanking = async (req: Request, res: Response) => {
  try {
    const ranking = await getAllRankingService();

    res.json(ranking);
  } catch(error) {
    console.error("Error in getAllRanking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// トップ画面用にデイリーコントリビューション数ランキング上位5人を取得
export const getTopRanking = async (req:Request, res: Response) => {
  try {
    const topRanking = await getTopRankingService();

    res.json(topRanking);
  } catch (error) {
    console.error("Error in getTopRanking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// デイリーランキングを取得
export const getDailyRanking = async (req: Request, res: Response) => {
  try {
    const dailyRanking = await getDailyRankingService();

    res.json(dailyRanking);
  } catch (error) {
    console.error("Error in getDailyRanking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ウィークリーランキングを取得
export const getWeeklyRanking = async (req: Request, res: Response) => {
  try {
    const dailyRanking = await getWeeklyRankingService();

    res.json(dailyRanking);
  } catch (error) {
    console.error("Error in getWeeklyRanking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// マンスリーランキングを取得
export const getMonthlyRanking = async (req: Request, res: Response) => {
  try {
    const dailyRanking = await getMonthlyRankingService();

    res.json(dailyRanking);
  } catch (error) {
    console.error("Error in getMonthlyRanking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
