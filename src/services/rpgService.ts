import prisma from "../config/prisma";

export const updateCoinService = async (uuid: string, coinStr: string) => {
  try {
    const getCoin = parseInt(coinStr);

    const user = await prisma.users.findUnique({
      where: { user_id: uuid },
      select: { coin: true },
    });

    if (user && user.coin !== null) {
      const currentCoin = parseInt(user.coin);

      const updateCoin = currentCoin + getCoin;

      await prisma.users.update({
        where: { user_id: uuid },
        data: { coin: updateCoin.toString() },
      });

      return {coin: updateCoin};
    }
  } catch(error: any) {
    throw new Error(error.message);
  }
}