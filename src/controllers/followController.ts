import { Request, Response } from "express";
import {
  addFollowService,
  deleteFollowService,
  getFollowNumService,
  getFollowsService,
} from "../services/followService";

// ランダムマッチングからフォローされた場合
export const addFollow = async (req: Request, res: Response) => {
  try {
    const { uuid, IDs } = req.body;
    for (const id of IDs) {
      await addFollowService(uuid, id);
    }
    await addFollowService(uuid, IDs);
    res.status(200).json({ message: "Follows created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const deleteFollow = async (req: Request, res: Response) => {
  try {
    const { uuid, ID } = req.body;
    await deleteFollowService(uuid, ID);
    res.status(200).json({ message: "Follows deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const getFollowNum = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  try {
    const users = await getFollowNumService(uuid);
    res.status(200).json(users);
  } catch(error) {
    res.status(500).json({ error: "Error fetching followed users" });
  }
}
  
export const getFollows = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  try {
    const users = await getFollowsService(uuid);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching followed users" });
  }
};

// ユーザーページからフォローされた場合
export const addFollowOne = async (req: Request, res: Response) => {
  try {
    const { uuid, ID } = req.body;
    await addFollowService(uuid, ID);
    res.status(200).json({ message: "Likes created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
