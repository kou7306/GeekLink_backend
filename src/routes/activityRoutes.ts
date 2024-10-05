import { Router } from "express";
import { getActivityLog } from "../controllers/githubController";

const router = Router();

router.post("/github", getActivityLog);

export default router;
