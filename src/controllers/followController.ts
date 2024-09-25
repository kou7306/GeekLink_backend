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
    res.status(200).json({ message: "Likes created successfully" });
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
