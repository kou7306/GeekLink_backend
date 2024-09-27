import express, { Request, Response } from 'express';
import { graphql } from '../graphql/graphql';
import { getRepositoryQuery } from '../graphql/queries/getUserGithub';

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