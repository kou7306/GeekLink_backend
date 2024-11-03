import prisma from "../config/prisma";

const coinCalculation = async (uuid: string, coinStr: string) => {
  try {
    const getCoin = parseInt(coinStr, 10);

    const user = await prisma.users.findUnique({
      where: { user_id: uuid },
      select: { coin: true },
    });

    if (user && user.coin !== null) {
      const currentCoin = parseInt(user.coin, 10);

      const updateCoin = currentCoin + getCoin;

      return updateCoin;
    }
  } catch(error: any) {
    throw new Error(error.message);
  }
}

export const getUserCoinService = async (uuid: string) => {
  try {
    const coin = await prisma.users.findUnique({
      where: { user_id: uuid },
      select: { coin: true },
    });

    return coin
  } catch(error: any) {
    throw new Error(error.message);
  };
}

export const updateUserCoinService = async (uuid: string, coinStr: string) => {
  try {
    const updateCoin = await coinCalculation(uuid, coinStr);

    if (updateCoin !== undefined) {
      const updateCoinStr = updateCoin < 0 ? "0" : updateCoin.toString();
      
      await prisma.users.update({
      where: { user_id: uuid },
      data: { coin: updateCoinStr },
      });

      return { coin: updateCoin };
    }
    } catch (error: any) {
    throw new Error(error.message);
  }
}