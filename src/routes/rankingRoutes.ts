import { Router } from "express";
import {
  getAllRanking,
  getDailyRanking,
  getWeeklyRanking,
  getMonthlyRanking
} from "../controllers/rankingController";

const router = Router();

// 全てのランキングを取得(上位5件)
router.get("/all", getAllRanking);

router.get("/daily", getDailyRanking);
router.get("/weekly", getWeeklyRanking);
router.get("/monthly", getMonthlyRanking);

export default router;
