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
  // 小文字で `postData` を取得
  const { uuid, postData } = req.body;

  // バリデーション: 必要なフィールドが存在するか確認
  if (
    !uuid ||
    !postData ||
    !postData.title ||
    !postData.time ||
    !postData.comment
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // サービス関数に引数を渡す
    const newPost = await createPostService(
      uuid,
      postData.title,
      postData.time,
      postData.comment
    );
    res.status(201).json(newPost); // 作成したポストを返す
  } catch (error) {
    console.error("Error creating post:", error); // エラーログを追加
    res.status(500).json({ error: "Error creating post" });
  }
};

export const addReaction = async (req: Request, res: Response) => {
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
