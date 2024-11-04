import { Request, Response } from "express";
import {
  githubCallBackService,
  getUserGithubInfo,
  getRepostiroryService,
  getContributionService,
  getUseLanguagesService,
} from "../services/githubService";
import { error } from "console";

// OAuthでアクセストークンを取得
export const githubCallback = async (req: Request, res: Response) => {
  const { uuid, code } = req.body;
  try {
    const client_id = process.env.OAUTH_GITHUB_CLIENT_ID;
    const client_secret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
    if (client_id == undefined || client_secret == undefined) return;
    await githubCallBackService(uuid, code, client_id, client_secret);
    res.status(200).json({ message: "Likes created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

// ユーザーのGitHubから情報を取得
export const getGithubInfo = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  try {
    const { username, token } = await getUserGithubInfo(uuid);
    if (username == null || token == null) {
      res.status(400).json({ error: "Your GitHub account is not connected" });
      return;
    }

    // 各サービスを呼び出す
    const repositories = await getRepostiroryService(username, token);
    const contributions = await getContributionService(username, token);
    // const logs = await getActivityLogService(username, token, 10);
    const languages = await getUseLanguagesService(username, token);

    const result = { repositories, contributions, languages };

    res.json(result);
  } catch (error) {
    console.error("Error in getRepostitory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ユーザーのリポジトリ情報を取得(最新10件)
export const getRepository = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  try {
    const { username, token } = await getUserGithubInfo(uuid);
    if (username == null || token == null) {
      res.status(400).json({ error: "Your GitHub account is not connected" });
      return;
    }

    const repositories = await getRepostiroryService(username, token);

    res.json(repositories);
  } catch (error) {
    console.error("Error in getRepostitory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ユーザーのコントリビューション数を取得
export const getContribution = async (req: Request, res: Response) => {
  const { uuid } = req.query;
  if (typeof uuid !== "string") {
    res.status(400).json({ error: "Invalid parameters" });
    return;
  }
  try {
    const { username, token } = await getUserGithubInfo(uuid);
    if (username == null || token == null) {
      res.status(400).json({ error: "Your GitHub account is not connected" });
      return;
    }

    const contributions = await getContributionService(username, token);

    res.json(contributions);
  } catch (error) {
    console.error("Error in getContributions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ユーザーの使用言語量(割合)を取得
export const getUseLanguage = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  try {
    const { username, token } = await getUserGithubInfo(uuid);
    if (username == null || token == null) {
      res.status(400).json({ error: "Your GitHub account is not connected" });
      return;
    }

    const languages = await getUseLanguagesService(username, token);

    res.json(languages);
  } catch (error) {
    console.error("Error in getUseLanguage:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
