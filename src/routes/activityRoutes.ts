import { Router } from "express";
import { getGithubActivity } from "../controllers/activityController";
import { getQiitaActivity } from "../controllers/activityController";

const router = Router();

router.post("/github", getGithubActivity);
router.post("/qiita", getQiitaActivity);

export default router;
