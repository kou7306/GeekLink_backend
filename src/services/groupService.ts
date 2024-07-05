import exp from "constants";
import prisma from "../config/prisma";
import { Message, UserGroups, users } from "@prisma/client";
import { group } from "console";

export const getGroupMessagesService = async (
  groupId: string
): Promise<{ messages: Message[] }> => {
  // Messageテーブルから関連するメッセージを取得
  const messages: Message[] = await prisma.message.findMany({
    where: {
      room_id: groupId,
    },
  });

  return { messages };
};

export const getGroupMembersService = async (
  groupId: string
): Promise<{ group: UserGroups | null; members: users[] }> => {
  // Groupテーブルから関連するメンバーを取得
  const group: UserGroups | null = await prisma.userGroups.findUnique({
    where: {
      id: groupId,
    },
  });

  if (!group) {
    return { group: null, members: [] };
  }

  // member_idsを使用してusersテーブルからユーザー情報を取得
  const members: users[] = await prisma.users.findMany({
    where: {
      user_id: {
        in: group.member_ids,
      },
    },
  });

  return { group, members };
};

export const addGroupMemberService = async (
  groupId: string,
  userId: string
): Promise<UserGroups> => {
  // GroupMemberテーブルにメンバーを追加
  const group: UserGroups = await prisma.userGroups.update({
    where: {
      id: groupId,
    },
    data: {
      member_ids: {
        push: userId,
      },
    },
  });

  return group;
};

export const createGroupService = async (groupData: {
  owner_id: string;
  member_ids: string[];
  name: string;
  description: string;
}): Promise<UserGroups> => {
  // Groupテーブルに新しいグループを追加
  const group: UserGroups = await prisma.userGroups.create({
    data: {
      owner_id: groupData.owner_id,
      member_ids: groupData.member_ids,
      name: groupData.name,
      description: groupData.description,
    },
  });

  return group;
};

export const getGroupListService = async (): Promise<UserGroups[]> => {
  const group: UserGroups[] = await prisma.userGroups.findMany();

  return group;
};