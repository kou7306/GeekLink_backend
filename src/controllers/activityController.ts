import { Request, Response } from "express";
import {
  getUserGithubInfo,
  getActivityLogService,
} from "../services/githubService";
import { getQiitaUserActivityService } from "../services/qiitaService";
import { getUserAppActivityService } from "../services/appService";

export const getGithubActivity = async (req: Request, res: Response) => {
  // timeは何時間前までの活動を取得するか
  const { uuid, time } = req.query;

  if (typeof uuid !== "string" || typeof time !== "string") {
    res.status(400).json({ error: "Invalid uuid parameter" });
    console.log("Invalid uuid parameter");
    return;
  }

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
  // periodは"1mo" | "1yr";
  const { uuid, period } = req.query;
  if (typeof uuid !== "string" || typeof period !== "string") {
    res.status(400).json({ error: "Invalid parameters" });
    return;
  }
  try {
    const activity = await getQiitaUserActivityService(uuid, period);

    // 取得した活動データをそのままJSON形式で返す
    res.status(200).json(activity);
  } catch (error) {
    console.error("Error in getQiitaActivity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAppActivity = async (req: Request, res: Response) => {
  const { uuid, time } = req.query;
  if (typeof uuid !== "string" || typeof time !== "string") {
    res.status(400).json({ error: "Invalid parameters" });
    return;
  }
  try {
    const activity = await getUserAppActivityService(uuid, time);
    res.status(200).json(activity);
  } catch (error) {
    console.error("Error in getAppActivity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
