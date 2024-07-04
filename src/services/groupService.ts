import exp from "constants";
import prisma from "../config/prisma";
import { Message, Group } from "@prisma/client";
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
): Promise<{ group: Group | null }> => {
  // GroupMemberテーブルから関連するメンバーを取得
  const group: Group | null = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  });

  return { group };
};

export const addGroupMemberService = async (
  groupId: string,
  userId: string
): Promise<Group> => {
  // GroupMemberテーブルにメンバーを追加
  const group: Group = await prisma.group.update({
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
