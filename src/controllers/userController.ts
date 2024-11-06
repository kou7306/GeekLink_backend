import { Request, Response } from "express";
import {
  checkUserExistsService,
  getFilterUsers,
  getMutualFollowUsersService,
  getMessagesAndRoomService,
  getUserDataService,
  loginBonusService,
} from "../services/userService";
import { getLatestMessages } from "../services/messageService";

export const getUserData = async (req: Request, res: Response) => {
  const { uuid } = req.query as { uuid: string };
  try {
    const user = await getUserDataService(uuid);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMutualFollowUsers = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  try {
    const users = await getMutualFollowUsersService(uuid);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { uuid, partnerId } = req.query as { uuid: string; partnerId: string };
  try {
    const { roomId, messages } = await getMessagesAndRoomService(
      uuid,
      partnerId
    );
    res.status(200).json({ roomId: roomId, messages: messages });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const checkUserExists = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    const exists = await checkUserExistsService(user_id);

    res.status(200).json({ exists });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const filterUsers = async (req: Request, res: Response) => {
  const {
    places,
    ages,
    hobby,
    top_teches,
    occupations,
    graduate,
    desired_occupation,
    experience,
  } = req.body;

  try {
    const users = await getFilterUsers({
      places,
      ages,
      hobby,
      top_teches,
      occupations,
      graduate,
      desired_occupation,
      experience,
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getLatestMessage = async (req: Request, res: Response) => {
  const { uuid, partnerId } = req.query as { uuid: string; partnerId: string };
  try {
    const latestMessage = await getLatestMessages(uuid, partnerId);
    if (latestMessage) {
      res.status(200).json({ message: latestMessage });
    } else {
      res.status(404).json({ error: "No message found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getLoginBonus = async (req: Request, res: Response) => {
  const { uuid } = req.query as { uuid: string };
  try {
    const response = await loginBonusService(uuid);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "response not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
