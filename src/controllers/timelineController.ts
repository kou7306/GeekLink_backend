import { Request, Response } from "express";
import {
  getPostService,
  createPostService,
  addReactionService,
} from "../services/timelineService";

export const getPosts = async (req: Request, res: Response) => {
  // クエリパラメータからページとリミットを取得
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  try {
    // サービスからページネーションされたデータを取得
    const { posts } = await getPostService(page, limit);
    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { uuid, content } = req.body;
  console.log("Received data:", req.body);
  try {
    const users = await createPostService(uuid, content);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching liked users" });
  }
};

export const addReaction = async (req: Request, res: Response) => {
  console.log("Received data:", req.body);
  const { postId, userId, emoji } = req.body; // userId を追加

  try {
    // userId を追加してサービス関数を呼び出す
    const updatedPost = await addReactionService(postId, userId, emoji);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error adding reaction:", error); // エラーログの追加
    res.status(500).json({ error: "Failed to add reaction" });
  }
};
