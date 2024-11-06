import prisma from "../config/prisma";
import { users, Message, follows } from "@prisma/client";

export const getUserDataService = async (
  user_id: string
): Promise<users | null> => {
  // 特定のユーザーIDが存在するかを確認
  const user = await prisma.users.findUnique({
    where: {
      user_id: user_id,
    },
  });

  return user || null;
};

export const getMutualFollowUsersService = async (
  uuid: string
): Promise<users[]> => {
  const following = await prisma.follows.findMany({
    where: {
      follower_id: uuid,
    },
  });

  const followers = await prisma.follows.findMany({
    where: {
      followee_id: uuid,
    },
  });

  // 相互フォローのユーザーIDを取得
  const followingIds = following.map((follow) => follow.followee_id);
  const followerIds = followers.map((follow) => follow.follower_id);
  const mutualFollowIds = followingIds.filter((id) => followerIds.includes(id));

  // Userテーブルからマッチしたユーザーの情報を取得
  const matchedUsers: users[] = await prisma.users.findMany({
    where: {
      user_id: {
        in: mutualFollowIds,
      },
    },
  });

  return matchedUsers;
};

export const getMessagesAndRoomService = async (
  uuid: string,
  partnerId: string
): Promise<{ roomId: string; messages: Message[] }> => {
  // ルームIDを取得
  const room = await prisma.match.findFirst({
    where: {
      OR: [
        { AND: [{ user1_id: uuid }, { user2_id: partnerId }] },
        { AND: [{ user1_id: partnerId }, { user2_id: uuid }] },
      ],
    },
    select: {
      room_id: true,
    },
  });

  const roomId = room?.room_id || "";

  // Messageテーブルから関連するメッセージを取得
  const messages: Message[] = await prisma.message.findMany({
    where: {
      room_id: roomId,
    },
  });

  return { roomId, messages };
};

export const checkUserExistsService = async (
  user_id: string
): Promise<boolean> => {
  // 特定のユーザーIDが存在するかを確認
  const user = await prisma.users.findUnique({
    where: {
      user_id: user_id,
    },
  });

  // nameの初期値をEMPTYに設定しているため,
  // 初期登録ができていても名前の変更がまだ(プロフィールの設定がこれから)の場合はfalse
  return !!user && user.name !== "";
};

// 出身地を引数に取り、その出身地のユーザーを取得する関数
export const getSamePlaceUsersService = async (
  place: string,
  uuid: string
): Promise<users[]> => {
  // 特定のユーザーIDが存在するかを確認
  const users = await prisma.users.findMany({
    where: {
      place: place,
      NOT: {
        user_id: uuid,
      },
    },
  });

  return users;
};

// 年齢を引数に取り、その年齢のユーザーを取得する関数
export const getSameAgeUsersService = async (
  age: string,
  uuid: string
): Promise<users[]> => {
  // 特定のユーザーIDが存在するかを確認
  const users = await prisma.users.findMany({
    where: {
      age: age,
      NOT: {
        user_id: uuid,
      },
    },
  });

  return users;
};

// 卒業年度を引数に取り、その卒業年度のユーザーを取得する関数
export const getSameGraduateYearUsersService = async (
  graduate: string,
  uuid: string
): Promise<users[]> => {
  // 特定のユーザーIDが存在するかを確認
  const users = await prisma.users.findMany({
    where: {
      graduate: graduate,
      NOT: {
        user_id: uuid,
      },
    },
  });

  return users;
};

// 希望職種を引数に取り、その希望職種のユーザーを取得する関数
export const getSameJobTypeUsersService = async (
  desired_occupation: string,
  uuid: string
): Promise<users[]> => {
  // 特定のユーザーIDが存在するかを確認
  const users = await prisma.users.findMany({
    where: {
      desired_occupation: desired_occupation,
      NOT: {
        user_id: uuid,
      },
    },
  });

  return users;
};

// 1位の技術を引数に取り、その技術の一致度の高いユーザーを取得する関数
export const getSameTopTechUsersService = async (
  top_tech: string,
  uuid: string
): Promise<users[]> => {
  // 特定のユーザーIDが存在するかを確認
  const users = await prisma.users.findMany({
    where: {
      top_tech: top_tech,
      NOT: {
        user_id: uuid,
      },
    },
  });

  return users;
};

interface FilterUsersParams {
  places: string[];
  ages: string[];
  hobby: string;
  top_teches: string[];
  occupations: string[];
  graduate: string[];
  desired_occupation: string[];
  experience: string[];
}

// ユーザーの絞り込み検索を行う関数
export const getFilterUsers = async (
  params: FilterUsersParams
): Promise<users[]> => {
  const {
    places,
    ages,
    hobby,
    top_teches,
    occupations,
    graduate,
    desired_occupation,
    experience,
  } = params;

  const filters: any = {};

  if (places.length > 0) {
    filters.place = { in: places };
  }
  if (ages.length > 0) {
    filters.age = { in: ages };
  }
  if (hobby !== "") {
    filters.hobby = hobby;
  }
  if (top_teches.length > 0) {
    filters.top_tech = { in: top_teches };
  }
  if (occupations.length > 0) {
    filters.occupation = { in: occupations };
  }
  if (graduate.length > 0) {
    filters.graduate = { in: graduate };
  }
  if (desired_occupation.length > 0) {
    filters.desired_occupation = { in: desired_occupation };
  }
  if (experience.length > 0) {
    filters.experience = { hasSome: experience };
  }

  try {
    const users: users[] = await prisma.users.findMany({
      where: filters,
    });

    return users;
  } catch (error) {
    console.error("Error in getFilterUsers:", error);
    throw new Error("Failed to fetch users");
  }
};

export const loginBonusService = async (uuid: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        user_id: uuid,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const today = new Date();
    const todayISO = today.toISOString().split("T")[0];
    const lastLoginDate = user.last_login_date?.toISOString().split("T")[0];

    // if (lastLoginDate !== todayISO) {
    if (true) {
      const newLoginCount = (parseInt(user.total_login_count ?? "0") || 0) + 1;
      let newLifeAmount = parseInt(user.life ?? "0") || 0;

      const consecutiveLoginCount = parseInt(user.login_streak ?? "0") + 1;
      let coinsToAdd = 0;
      let lifeToAdd = 0;

      if (consecutiveLoginCount % 20 === 0) {
        coinsToAdd = 500;
      } else if (consecutiveLoginCount % 5 === 0) {
        coinsToAdd = 100;
      }

      // ライフの追加ロジック
      if (consecutiveLoginCount % 5 !== 0) {
        if (consecutiveLoginCount >= 1 && consecutiveLoginCount <= 4) {
          lifeToAdd = 1;
        } else if (consecutiveLoginCount >= 6 && consecutiveLoginCount <= 9) {
          lifeToAdd = 1;
        } else if (consecutiveLoginCount >= 10 && consecutiveLoginCount <= 14) {
          lifeToAdd = 2;
        } else if (consecutiveLoginCount >= 16 && consecutiveLoginCount <= 19) {
          lifeToAdd = 2;
        } else if (consecutiveLoginCount >= 20) {
          lifeToAdd = 3;
        }
      }

      newLifeAmount += lifeToAdd;

      const userData = await prisma.users.update({
        where: {
          user_id: uuid,
        },
        data: {
          life: newLifeAmount.toString(),
          last_login_date: new Date(),
          total_login_count: newLoginCount.toString(),
          login_streak: consecutiveLoginCount.toString(),
          coin: (parseInt(user.coin ?? "0") + coinsToAdd).toString(),
        },
      });

      // 更新情報を構築
      const response: {
        success: boolean;
        userData: typeof userData;
        updated: string[];
        lifeAdded?: number;
        coinsAdded?: number;
      } = { success: true, userData, updated: [] };

      if (lifeToAdd > 0) {
        response.updated.push("life");
        response.lifeAdded = lifeToAdd; // 獲得したライフを追加
      }
      if (coinsToAdd > 0) {
        response.updated.push("coin");
        response.coinsAdded = coinsToAdd; // 獲得したコインを追加
      }

      return response;
    } else {
      return {
        success: false,
        userData: user,
        updated: [],
        lifeAdded: 0,
        coinsAdded: 0,
      };
    }
  } catch (error) {
    console.error("Error granting login bonus:", error);
    throw new Error("Failed to grant login bonus");
  }
};
