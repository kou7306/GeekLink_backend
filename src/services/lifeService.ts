import prisma from "../config/prisma";

// ライフを更新する
export const updateLifeService = async (userId: string, life: string) => {
  const user = await prisma.users.update({
    where: {
      user_id: userId,
    },
    data: {
      life: life,
    },
  });
  return user;
};
