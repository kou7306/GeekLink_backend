import { Request, Response } from "express";
import {
  getUserCoinService,
  updateUserCoinService,
  getUserItemsService,
  getItemService,
  getUserCostumesService,
  getCostumeService,
  getUserPositionService,
  updateUserPositionService,
} from "../services/rpgService";

export const getUserCoin = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;
    const coin = await getUserCoinService(uuid);

    res.json(coin);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const updateUserCoin = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;
    const { coin } = req.body;
    const result = await updateUserCoinService(uuid, coin);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const getUserItems = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;
    const items = await getUserItemsService(uuid);

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const { uuid, item } = req.body;
    const result = await getItemService(uuid, item);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const getUserCostumes = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;
    const costumes = await getUserCostumesService(uuid);

    res.json(costumes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const getCostume = async (req: Request, res: Response) => {
  try {
    const { uuid, costume, coin } = req.body;
    const result = await getCostumeService(uuid, costume, coin);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const getUserPosition = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;
    const position = await getUserPositionService(uuid);

    res.json(position);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const updateUserPosition = async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;
    const { positionX, positionY } = req.body;
    const result = await updateUserPositionService(uuid, positionX, positionY);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
