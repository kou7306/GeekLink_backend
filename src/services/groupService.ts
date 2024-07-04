import prisma from "../config/prisma";
import { Message } from "@prisma/client";

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
