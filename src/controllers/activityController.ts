import { Request, Response } from "express";
import {
  getUserGithubInfo,
  getActivityLogService,
} from "../services/githubService";
import { getQiitaUserActivityService } from "../services/qiitaService";

export const getGithubActivity = async (req: Request, res: Response) => {
  const { uuid, time } = req.body;
  try {
    const { username, token } = await getUserGithubInfo(uuid);

    // 各サービスを呼び出す
    const logs = await getActivityLogService(username, token, time);

    const result = { logs };

    res.json(result);
  } catch (error) {
    console.error("Error in getRepostitory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getQiitaActivity = async (req: Request, res: Response) => {
  const { uuid, period } = req.body;
  try {
    const activity = await getQiitaUserActivityService(uuid, period);

    // 取得した活動データをそのままJSON形式で返す
    res.status(200).json(activity);
  } catch (error) {
    console.error("Error in getQiitaActivity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
