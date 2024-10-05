import { Request, Response } from "express";
import {
  getDailyRankingService,
  getWeeklyRankingService,
  getMonthlyRankingService
} from "../services/rankingService";

// デイリーランキングを取得
export const getDailyRanking = async (req: Request, res: Response) => {
  try {
    const dailyRanking = await getDailyRankingService();

    res.json(dailyRanking);
  } catch (error) {
    console.error("Error in getRepostitory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ウィークリーランキングを取得
export const getWeeklyRanking = async (req: Request, res: Response) => {
  try {
    const dailyRanking = await getWeeklyRankingService();

    res.json(dailyRanking);
  } catch (error) {
    console.error("Error in getRepostitory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// マンスリーランキングを取得
export const getMonthlyRanking = async (req: Request, res: Response) => {
  try {
    const dailyRanking = await getMonthlyRankingService();

    res.json(dailyRanking);
  } catch (error) {
    console.error("Error in getRepostitory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
