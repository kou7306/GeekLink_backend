import { Request, Response } from "express";
import { updateLifeService } from "../services/lifeService";

export const updateLifeController = async (req: Request, res: Response) => {
  const { uuid, life } = req.body as { uuid: string; life: string };
  try {
    const user = await updateLifeService(uuid, life);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
