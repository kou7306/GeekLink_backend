import { users as PrismaUser } from "@prisma/client";
import prisma from "../config/prisma";

export const updateProfileService = async (
  user_id: string,
  profileData: PrismaUser
) => {
  try {
    const updatedUser = await prisma.users.update({
      where: { user_id: user_id },
      data: profileData,
    });

    return updatedUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getProfileService = async (
  user_id: string
): Promise<PrismaUser | null> => {
  try {
    const user = await prisma.users.findUnique({
      where: { user_id: user_id },
    });

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const LikeStatusCheck = async (
  user_id: string,
  other_user_id: string
) => {
  try {
    const result = await prisma.like.findFirst({
      where: {
        user_id: user_id,
        liked_user_id: other_user_id,
      },
    });

    return result !== null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
