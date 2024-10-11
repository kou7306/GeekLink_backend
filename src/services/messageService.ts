import prisma from "../config/prisma";
import { Message } from "../models/messageModel";

export const saveMessage = async (msg: Message): Promise<void> => {
  try {
    const { sender_id, receiver_id, content, created_at, room_id } = msg;
    await prisma.message.create({
      data: {
        sender_id: sender_id,
        receiver_id: receiver_id,
        content: content,
        created_at: created_at,
        room_id: room_id,
      },
    });
  } catch (error: any) {
    console.error("Error inserting message into database:", error);
    throw new Error("Failed to insert message");
  }
};

export const getLatestMessages = async (
  uuid: string,
  partnerId: string
): Promise<Message | null> => {
  try {
    // ルームIDを取得
    const room = await prisma.match.findFirst({
      where: {
        OR: [
          { AND: [{ user1_id: uuid }, { user2_id: partnerId }] },
          { AND: [{ user1_id: partnerId }, { user2_id: uuid }] },
        ],
      },
      select: {
        room_id: true,
      },
    });

    const roomId = room?.room_id || "";

    // Messageテーブルから最新のメッセージを取得
    const latestMessage = await prisma.message.findFirst({
      where: {
        room_id: roomId, // ルームIDでフィルタリング
      },
      orderBy: {
        created_at: "desc", // createdAtで降順にソート（最新のメッセージが最初に来る）
      },
    });

    if (latestMessage) {
      return latestMessage;
    }

    return null;
  } catch (error: any) {
    console.error("Error getting messages from database:", error);
    throw new Error("Failed to get messages");
  }
};
