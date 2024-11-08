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
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserCoinService = async (uuid: string) => {
  try {
    const coin = await prisma.users.findUnique({
      where: { user_id: uuid },
      select: { coin: true },
    });

    return coin;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateUserCoinService = async (uuid: string, coinStr: string) => {
  try {
    const updateCoin = await coinCalculation(uuid, coinStr);

    if (updateCoin !== undefined) {
      const updateCoinStr = updateCoin < 0 ? "0" : updateCoin.toString();

      await prisma.users.update({
        where: { user_id: uuid },
        data: { coin: updateCoinStr },
      });

      return { coin: updateCoinStr };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

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

export const getItemService = async (uuid: string, item: string, coinStr: string) => {
  try {
    // 現在のユーザー情報を取得
    const user = await prisma.users.findUnique({
      where: { user_id: uuid },
      select: { items: true },
    });

    // アイテムの重複チェック
    if (user?.items?.includes(item)) {
      return {
        result: "すでに所持しているアイテムです",
      };
    }

    const updateCoin = await coinCalculation(uuid, coinStr);

    if (updateCoin !== undefined && updateCoin >= 0) {
      const updateCoinStr = updateCoin.toString();

      await prisma.users.update({
        where: { user_id: uuid },
        data: {
          coin: updateCoinStr,
          items: {
            push: item,
          },
        },
      });

      return {
        coin: updateCoinStr,
        item: item,
        result: "アイテムを購入しました",
      };
    } else if (updateCoin !== undefined && updateCoin < 0) {
      return {
        result: "コインが不足しているためアイテムを購入できませんでした",
      };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserPositionService = async (uuid: string) => {
  try {
    const position = await prisma.users.findUnique({
      where: { user_id: uuid },
      select: {
        position_x: true,
        position_y: true,
      },
    });

    return position;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateUserPositionService = async (
  uuid: string,
  positionXStr: string,
  positionYStr: string
) => {
  try {
    const user = await prisma.users.findUnique({
      where: { user_id: uuid },
      select: {
        position_x: true,
        position_y: true,
      },
    });

    if (user && user.position_x !== null && user.position_y !== null) {
      const updatePositionX = parseInt(user.position_x, 10) + parseInt(positionXStr, 10);
      const updatePositionY = parseInt(user.position_y, 10) + parseInt(positionYStr, 10);

      const updatePositionXStr = updatePositionX.toString();
      const updatePositionYStr = updatePositionY.toString();

      await prisma.users.update({
        where: { user_id: uuid },
        data: {
          position_x: updatePositionXStr,
          position_y: updatePositionYStr,
        },
      });

      return {
        positionX: updatePositionXStr,
        positionY: updatePositionYStr,
      };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
