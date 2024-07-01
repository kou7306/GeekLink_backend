import { Request, Response } from "express";
import { RandomCreateLikeService, OneCreateLikeService } from "../services/likeService";

export const createLike = async (req: Request, res: Response) => {
  console.log("Received data:", req.body);
  try {
    const { uuid, IDs } = req.body;
    await createLikeService(uuid, IDs);
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