import { Router } from "express";
import { getGithubActivity } from "../controllers/activityController";

const router = Router();

router.post("/github", getGithubActivity);

export default router;
