import prisma from "../config/prisma";
import { v4 as uuidv4 } from "uuid";
import { Like } from "../models/likeModel";
import { matchingCheck } from "./matchingService";

// ランダムマッチでいいねを送られた場合
export const RandomCreateLikeService = async (uuid: string, ids: string[]): Promise<void> => {
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


// ユーザーページからいいねを送られた場合
export const OneCreateLikeService = async (uuid: string, ID: string): Promise<void> => {
  const user_id = uuid;
  const other_user_id = ID;

  const row: Like = {
    user_id: user_id,
    liked_user_id: other_user_id,
    created_at: new Date(),
  };

  try {
    await prisma.like.create({
      data: row,
    });
  } catch (error: any) {
    console.error("Error creating like:", error);
  }

  await matchingCheck(user_id, other_user_id);
};