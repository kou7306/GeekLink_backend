import { Request, Response } from "express";
import { createLikeService } from "../services/likeService";

export const createLike = async (req: Request, res: Response) => {
  try {
    const { uuid, ids } = req.body;
    await createLikeService(uuid, ids);
    res.status(200).json({ message: "Likes created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
