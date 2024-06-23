import { Request, Response } from "express";
import { getRandomMatchesService } from "../services/matchService";

export const getRandomMatches = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.body;
    const randomUsers = await getRandomMatchesService(uuid);
    res.status(200).json(randomUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
