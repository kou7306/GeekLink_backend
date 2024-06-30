import { Request, Response } from "express";
import {
  checkUserExistsService,
  getMatchingUsersService,
  getMessagesAndRoomService,
} from "../services/userService";

export const getMatchingUsers = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  try {
    const users = await getMatchingUsersService(uuid);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { uuid, parnerId } = req.params;
  try {
    const roomId,
      messages = await getMessagesAndRoomService(uuid, parnerId);
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
