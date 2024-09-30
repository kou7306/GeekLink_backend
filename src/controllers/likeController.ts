import { Request, Response } from "express";
import {
  createLikeService,
  deleteLikeService,
  getLikedUsersService,
  getUsersWhoLikedMeService,
} from "../services/likeService";

export const createLike = async (req: Request, res: Response) => {
  try {
    const { uuid, IDs } = req.body;
    for (const id of IDs) {
      await createLikeService(uuid, id);
    }
    await createLikeService(uuid, IDs);
    res.status(200).json({ message: "Likes created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const deleteLike = async (req: Request, res: Response) => {
  try {
    const { uuid, ID } = req.body;
    await deleteLikeService(uuid, ID);
    res.status(200).json({ message: "Likes deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const getLikedUsers = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  try {
    const users = await getLikedUsersService(uuid);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching liked users" });
  }
};

export const getUsersWhoLikedMe = async (req: Request, res: Response) => {
  const { uuid, matchingUserIds } = req.body;
  try {
    const users = await getUsersWhoLikedMeService(uuid, matchingUserIds);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users who liked me" });
  }
};

// ユーザーページからいいねを送られた場合
export const OnecreateLike = async (req: Request, res: Response) => {
  try {
    const { uuid, ID } = req.body;
    await createLikeService(uuid, ID);
    res.status(200).json({ message: "Likes created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
