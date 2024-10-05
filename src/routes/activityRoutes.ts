import { Router } from "express";
import { getGithubActivity } from "../controllers/activityController";
import { getQiitaActivity } from "../controllers/activityController";

const router = Router();

router.get("/github", getGithubActivity);
router.get("/qiita", getQiitaActivity);

export default router;
