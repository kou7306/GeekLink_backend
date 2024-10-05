import { Router } from "express";
import {
  getDailyRanking,
  getWeeklyRanking,
  getMonthlyRanking
} from "../controllers/rankingController";

const router = Router();

router.get("/daily", getDailyRanking);
router.get("/weekly", getWeeklyRanking);
router.get("/monthly", getMonthlyRanking);

export default router;
