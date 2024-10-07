import { Router } from "express";
import {
  getGithubActivity,
  getQiitaActivity,
  getAppActivity,
} from "../controllers/activityController";

const router = Router();

router.get("/github", getGithubActivity);
router.get("/qiita", getQiitaActivity);
router.get("/app", getAppActivity);

export default router;
