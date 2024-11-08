import prisma from "../config/prisma";

export const getUserItemsService = async (uuid: string) => {
  try {
    const items = await prisma.users.findUnique({
      where: { user_id: uuid },
      select: { items: true },
    });
    return items;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCurrentAvatarId = async (uuid: string) => {
  try {
    const currentAvatarId = await prisma.users.findUnique({
      where: { user_id: uuid },
      select: { current_avatar: true },
    });
    return currentAvatarId;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const updateCurrentAvatarService = async (uuid: string, avatarId: string) => {
  try {
    await prisma.users.update({
      where: { user_id: uuid },
      data: { current_avatar: avatarId },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
