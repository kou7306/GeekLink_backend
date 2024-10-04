import { Router } from "express";
import {
  githubCallback,
  getGithubInfo,
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
router.post("/lang", getUseLanguage);

router.post("/info", getGithubInfo);

export default router;