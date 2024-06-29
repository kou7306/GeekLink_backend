import { Users as PrismaUser } from "@prisma/client";
import prisma from "../config/prisma";

export const getRandomMatchesService = async (user_id: string): Promise<PrismaUser[]> => {
  try {
    const users = await prisma.users.findMany({
      where: {
        user_id: {
          not: user_id,
        },
      },
    });

    const users_num = Math.min(users.length, 5);
    const randomUsers: PrismaUser[] = [];

    for (let i = 0; i < users_num; i++) {
      const index = Math.floor(Math.random() * users.length);
      randomUsers.push(users[index] as PrismaUser);
      users.splice(index, 1);
    }

    return randomUsers;
  } catch (error: any) {
    console.error("Error fetching users:", error);
    throw new Error(error.message);
  }
};
