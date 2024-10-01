import { Router } from "express";
import {
  githubCallback,
  getRepository,
  getContribution,
  getActivityLog,
  getUseLanguage
} from "../controllers/githubController";

const router = Router();

router.post("/callback", githubCallback);
// TODO: routeは仮置き
router.post("/repo", getRepository);
router.post("/cont", getContribution);
router.post("/log", getActivityLog);
router.post("/lang", getUseLanguage)

export default router;