import { Request, Response } from "express";
import { updateCoinService } from "../services/rpgService";
 
export const updateCoin = async (req: Request, res: Response) => {
  const { uuid, coin } = req.body;
  try {
    const result = await updateCoinService(uuid, coin);

    res.json(result)
  } catch(error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
}