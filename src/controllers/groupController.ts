import { Request, Response } from "express";
import {
  getGroupMessagesService,
  getGroupMembersService,
  addGroupMemberService,
  createGroupService,
  getGroupListService
} from "../services/groupService";

export const getGroupMessages = async (req: Request, res: Response) => {
  const { groupId } = req.query as { groupId: string };

  try {
    const { messages } = await getGroupMessagesService(groupId);

    res.status(200).json({ messages: messages });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getGroupMembers = async (req: Request, res: Response) => {
  const { groupId } = req.query as { groupId: string };

  try {
    const { group, members } = await getGroupMembersService(groupId);

    res.status(200).json({ group, members });
  } catch (error) {
    console.error("Error fetching group members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addGroupMember = async (req: Request, res: Response) => {
  const { groupId, uuid } = req.body as { groupId: string; uuid: string };
  
  try {
    await addGroupMemberService(groupId, uuid);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createGroup = async (req: Request, res: Response) => {
  const { groupData } = req.body as {
    groupData: {
      owner_id: string;
      member_ids: string[];
      name: string;
      description: string;
    };
  };

  try {
    const group = await createGroupService(groupData);
    res.status(200).json({ group });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getGroupList = async (req: Request, res: Response) => {
  try {
    const group = await getGroupListService();
    res.status(200).json({ group });
  } catch (error) {
    console.error("Error fetching group members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};