import { Request, Response } from "express";
import { getUserRankService, updateUserRankService } from "../services/rankService";
 
export const updateUserRank = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  try {
    const result = await updateUserRankService(uuid);

    res.json(result)
  } catch(error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
}

export const getUserRank = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  try {
    const result = await getUserRankService(uuid);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
