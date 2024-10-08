import prisma from "../config/prisma";
import { Like } from "../models/likeModel";
import { matchingCheck } from "./matchingService";

// いいねをする
export const createLikeService = async (
  uuid: string,
  ID: string
): Promise<void> => {
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

// いいねを取り消す
export const deleteLikeService = async (
  uuid: string,
  ID: string
): Promise<void> => {
  const user_id = uuid;
  const other_user_id = ID;

  try {
    await prisma.like.deleteMany({
      where: {
        user_id: user_id,
        liked_user_id: other_user_id,
      },
    });
  } catch (error: any) {
    console.error("Error deleting like:", error);
  }

  await matchingCheck(user_id, other_user_id);
};

export const getLikedUsersService = async (uuid: string) => {
  // LikeテーブルからログインユーザーがLikeしたユーザーのIDを取得
  const likes = await prisma.like.findMany({
    where: {
      user_id: uuid,
    },
  });

  const likedUserIds = likes.map((like) => like.liked_user_id);

  // UserテーブルからLikeしたユーザーの情報を取得
  const likedUsers = await prisma.users.findMany({
    where: {
      user_id: {
        in: likedUserIds,
      },
    },
  });

  return likedUsers;
};

export const getUsersWhoLikedMeService = async (
  uuid: string,
  matchingUserIds: string[]
) => {
  // 自分のことをLikeしたユーザーのIDを取得
  const likes = await prisma.like.findMany({
    where: {
      liked_user_id: uuid,
    },
  });

  const likedByUserIds = likes.map((like) => like.user_id);

  // マッチしていないユーザーのみをフィルタリング
  const nonMatchedLikedByUserIds = likedByUserIds.filter(
    (user_id) => !matchingUserIds.includes(user_id)
  );

  // UserテーブルからLikeしたがマッチしていないユーザーの情報を取得
  const usersWhoLikedMe = await prisma.users.findMany({
    where: {
      user_id: {
        in: nonMatchedLikedByUserIds,
      },
    },
  });

  return usersWhoLikedMe;
};
