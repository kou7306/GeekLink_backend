import express, { Request, Response } from 'express';
import { graphql } from '../graphql/graphql';
import { githubCallBackService } from '../services/githubService';
import { getRepositoryQuery } from '../graphql/queries/getUserGithub';

// OAuthでアクセストークンを取得
export const githubCallback = async (req: Request, res: Response) => {
  const { uuid, code } = req.body;
  try {
    console.log("uuid:", uuid);
    const client_id = process.env.GITHUB_CLIENT_ID;
    const client_secret = process.env.GITHUB_CLIENT_SECRET;
    if (client_id == undefined || client_secret == undefined) return;
    await githubCallBackService(uuid, code, client_id, client_secret);
    res.status(200).json({ message: "Likes created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

// ユーザーのGitHubから情報を取得(公開リポジトリのみ)

// ユーザーのリポジトリ情報を取得(最新10件)
export const getRepository = async (req: Request, res: Response) => {
  try {
    const userName = req.params.username;

    const repositories = await graphql(
      getRepositoryQuery,
      { userName },
    );

    res.json(repositories);
  } catch(error) {
    console.error("Error in getRepostitory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};