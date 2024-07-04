import { Request, Response } from "express";
import { getGroupMessagesService } from "../services/groupService";

export const getGroupMessages = async (req: Request, res: Response) => {
  const { groupId } = req.query as { groupId: string };
  console.log("groupId: ", groupId);
  try {
    const { messages } = await getGroupMessagesService(groupId);
    console.log("messages: ", messages);
    res.status(200).json({ messages: messages });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
