import prisma from "../config/prisma";
import { Follow } from "../models/followModel";

// フォローする
export const addFollowService = async (uuid: string, ID: string): Promise<void> => {
  const user_id = uuid;
  const other_user_id = ID;

  const row: Follow = {
    follower_id: user_id,
    followee_id: other_user_id,
    created_at: new Date(),
  };

  try {
    await prisma.follows.create({
      data: row,
    });
  } catch (error: any) {
    throw new Error(error.message);
  };
};

// フォローを取り消す
export const deleteFollowService = async (uuid: string, ID: string): Promise<void> => {
  const user_id = uuid;
  const other_user_id = ID;

  try {
    await prisma.follows.deleteMany({
      where: {
        follower_id: user_id,
        followee_id: other_user_id,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  };
};

export const getFollowNumService = async (uuid: string) => {
  try {
    // 自分がフォローしているユーザーを取得(フォロー)
    const follows = await prisma.follows.findMany({
      where: {
        follower_id: uuid,
      },
    });

    // 自分をフォローしているユーザーを取得(フォロワー)
    const followers = await prisma.follows.findMany({
      where: {
        followee_id: uuid,
      },
    });

    const result = {
      followsNum: follows.length,
      followersNum: followers.length,
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  };
};


// ユーザーのフォロー・フォロワーを取得
export const getFollowsService = async (uuid: string) => {
  try {
    // 自分がフォローしているユーザーを取得(フォロー)
    const follows = await prisma.follows.findMany({
      where: {
        follower_id: uuid,
      },
    });

    const followIds = follows.map(follow => follow.followee_id);

    const followUsers = await prisma.users.findMany({
      where: {
        user_id: {
          in: followIds,
        },
      },
      select: {
        user_id: true,
        name: true,
        image_url: true,
      },
    });

    // 自分をフォローしているユーザーを取得(フォロワー)
    const followers = await prisma.follows.findMany({
      where: {
        followee_id: uuid,
      },
    });

    const followerIds = followers.map(follow => follow.follower_id);

    const followerUsers = await prisma.users.findMany({
      where: {
        user_id: {
          in: followerIds,
        },
      },
      select: {
        user_id: true,
        name: true,
        image_url: true,
      },
    });

    const result = {
      followsNum: follows.length,
      followersNum: followers.length,
      follows: followUsers,
      followers: followerUsers,
    };

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  };
};