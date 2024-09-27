import prisma from "../config/prisma";
import { matchingCheck } from "./matchingService";

export const followUserService = async (
  uuid: string,
  IDs: string[]
): Promise<void> => {
  const user_id = uuid;

  for (const id of IDs) {
    const other_user_id = id;

    const row = {
      user_id,
      followed_user_id: other_user_id,
      created_at: new Date(),
    };

    try {
      await prisma.follow.create({
        data: row,
      });
    } catch (error: any) {
      console.error("Error creating follow:", error);
      continue;
    }

    await matchingCheck(user_id, other_user_id);
  }
};

export const unFollowUserService = async (
  uuid: string,
  IDs: string[]
): Promise<void> => {
  const user_id = uuid;

  for (const id of IDs) {
    const other_user_id = id;

    try {
      // 該当するレコードを削除
      await prisma.follow.deleteMany({
        where: {
          user_id: user_id,
          followed_user_id: other_user_id,
        },
      });
    } catch (error: any) {
      console.error("Error deleting follow:", error);
      continue;
    }

    await matchingCheck(user_id, other_user_id);
  }
};
