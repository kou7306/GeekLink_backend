import prisma from "../config/prisma";
import { Message } from "../models/messageModel";

export const saveMessage = async (msg: Message): Promise<void> => {
  const message = {
    sender_id: msg.sender_id,
    receiver_id: msg.receiver_id,
    content: msg.content,
    created_at: msg.created_at,
    conversation_id: msg.conversation_id,
  };

  try {
    await prisma.message.create({
      data: message,
    });
  } catch (error: any) {
    console.error("Error inserting message into database:", error);
    throw new Error("Failed to insert message");
  }
};
