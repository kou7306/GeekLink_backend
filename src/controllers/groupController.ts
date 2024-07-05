import { Request, Response } from "express";
import {
  getGroupMessagesService,
  getGroupMembersService,
  addGroupMemberService,
} from "../services/groupService";
import exp from "constants";

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

export const getGroupMembers = async (req: Request, res: Response) => {
  const { groupId } = req.query as { groupId: string };
  console.log("groupId: ", groupId);
  try {
    const { group, members } = await getGroupMembersService(groupId);
    console.log("group: ", group);
    console.log("members: ", members);
    res.status(200).json({ group, members });
  } catch (error) {
    console.error("Error fetching group members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addGroupMember = async (req: Request, res: Response) => {
  const { groupId, uuid } = req.body as { groupId: string; uuid: string };
  console.log("groupId: ", groupId);
  console.log("uuid: ", uuid);
  try {
    await addGroupMemberService(groupId, uuid);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
