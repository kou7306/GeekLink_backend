import { Request, Response } from "express";
import {
  getUserGithubInfo,
  getActivityLogService,
} from "../services/githubService";

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
