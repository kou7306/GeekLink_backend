import { Request, Response } from "express";
import { getUserRankService } from "../services/rankService";

export const getUserRank = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  try {
    const result = await getUserRankService(uuid);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
