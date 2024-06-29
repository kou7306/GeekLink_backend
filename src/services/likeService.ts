import prisma from "../config/prisma";
import { v4 as uuidv4 } from "uuid";
import { Like } from "../models/likeModel";
import { matchingCheck } from "./matchingService";

export const createLikeService = async (uuid: string, ids: string[]): Promise<void> => {
  const user_id = uuidv4();

  for (const id of ids) {
    const other_user_id = uuidv4();

    const row: Like = {
      user_id,
      liked_user_id: other_user_id,
      created_at: new Date(),
    };

    try {
      await prisma.like.create({
        data: row,
      });
    } catch (error: any) {
      console.error("Error creating like:", error);
      continue;
    }

    await matchingCheck(user_id, other_user_id);
  }
};
