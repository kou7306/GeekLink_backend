import { Request, Response } from "express";
import { RandomCreateLikeService, OneCreateLikeService } from "../services/likeService";

// ランダムマッチでいいねを送られた場合
export const RandomCreateLike = async (req: Request, res: Response) => {
  try {
    const { uuid, ids } = req.body;
    await RandomCreateLikeService(uuid, ids);
    res.status(200).json({ message: "Likes created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

// ユーザーページからいいねを送られた場合
export const OneCreateLike = async (req: Request, res: Response) => {
  try {
    const { uuid, ID } = req.body;
    await OneCreateLikeService(uuid, ID);
    res.status(200).json({ message: "Likes created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};