import { Router } from "express";
import {
  getRepository,
  githubCallback
} from "../controllers/githubController";

const router = Router();

router.post("/callback", githubCallback);
// TODO: routeは仮置き
router.post("/repo/:username", getRepository);

export default router;