import prisma from "../config/prisma";
import { Like } from "../models/likeModel";
import { matchingCheck } from "./matchingService";

export const createLikeService = async (
  uuid: string,
  IDs: string[]
): Promise<void> => {
  const user_id = uuid;

  for (const id of IDs) {
    const other_user_id = id;

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
