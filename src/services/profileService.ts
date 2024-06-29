import { User as PrismaUser } from "@prisma/client";
import prisma from "../config/prisma";

export const updateProfileService = async (user_id: string, profileData: PrismaUser) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { user_id: user_id },
      data: profileData,
    });

    return updatedUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getProfileService = async (user_id: string): Promise<PrismaUser | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: user_id },
    });

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
