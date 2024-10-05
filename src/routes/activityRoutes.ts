import { Router } from "express";
import {
  getGithubActivity,
  getQiitaActivity,
  getAppActivity
} from "../controllers/activityController";

const router = Router();

router.post("/github", getGithubActivity);
router.post("/qiita", getQiitaActivity);
router.post("/app", getAppActivity);

export default router;
