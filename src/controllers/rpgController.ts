import { Request, Response } from "express";
import {
  getUserCoinService,
  updateUserCoinService
} from "../services/rpgService";

export const getUserCoin = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;
    const coin = await getUserCoinService(uuid);

    res.json(coin);
  } catch(error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  };
};
 
export const updateUserCoin = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;
    const { coin } = req.body
    const result = await updateUserCoinService(uuid, coin);

    res.json(result)
  } catch(error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
}