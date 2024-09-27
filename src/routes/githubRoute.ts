import { Router } from "express";
import {
  getRepository
} from "../controllers/githubController";

const router = Router();

// TODO: routeは仮置き
router.post("/repo/:username", getRepository);

export default router;