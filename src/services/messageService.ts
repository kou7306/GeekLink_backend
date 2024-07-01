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
