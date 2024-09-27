import { Request, Response } from "express";
import {
  followUserService,
  unFollowUserService,
} from "../services/followService";

export const followUser = async (req: Request, res: Response) => {
  console.log("Received data:", req.body);
  try {
    const { uuid, IDs } = req.body;
    await followUserService(uuid, IDs);
    res.status(200).json({ message: "Follow successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const unFollowUser = async (req: Request, res: Response) => {
  console.log("Received data:", req.body);
  try {
    const { uuid, IDs } = req.body;
    await unFollowUserService(uuid, IDs);
    res.status(200).json({ message: "Likes created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const getFollowedUsers = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  try {
    const users = await getFollowedUsersService(uuid);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching liked users" });
  }
};

export const getUsersWhoFollowedMe = async (req: Request, res: Response) => {
  const { uuid, matchingUserIds } = req.body;
  try {
    const users = await getUsersWhoFollowedMeService(uuid, matchingUserIds);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users who liked me" });
  }
};
