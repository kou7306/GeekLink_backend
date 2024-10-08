import { Router } from "express";
import {
  getAllRanking,
  getTopRanking,
  getDailyRanking,
  getWeeklyRanking,
  getMonthlyRanking,
} from "../controllers/rankingController";

const router = Router();

router.get("/top", getTopRanking);
router.get("/all", getAllRanking);
router.get("/daily", getDailyRanking);
router.get("/weekly", getWeeklyRanking);
router.get("/monthly", getMonthlyRanking);

export default router;
