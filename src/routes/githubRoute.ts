import { Router } from "express";
import {
  githubCallback,
  getGithubInfo,
  getRepository,
  getContribution,
  getUseLanguage,
} from "../controllers/githubController";

const router = Router();

router.post("/callback", githubCallback);
// TODO: routeは仮置き
router.post("/repo", getRepository);
router.get("/contributionList", getContribution);
router.post("/lang", getUseLanguage);

router.post("/info", getGithubInfo);

export default router;
