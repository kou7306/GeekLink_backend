import prisma from "../config/prisma";
import { Users, Message, Match } from "@prisma/client";
// import { User } from "../models/userModel";
// import { Match } from "../models/matchModel";
// import { Message } from "../models/messageModel";

export const getUserDataService = async (
  user_id: string
): Promise<Users | null> => {
  // 特定のユーザーIDが存在するかを確認
  const user = await prisma.users.findUnique({
    where: {
      user_id: user_id,
    },
  });

  return user || null;
};

export const getMatchingUsersService = async (
  uuid: string
): Promise<Users[]> => {
export const getMatchingUsersService = async (uuid: string): Promise<Users[]> => {
  // MatchテーブルからマッチしたユーザーのIDを取得
  const matches = await prisma.match.findMany({
    where: {
      OR: [{ user1_id: uuid }, { user2_id: uuid }],
    },
  });

  const matchedUserIds = matches.flatMap((match: Match) =>
    match.user1_id === uuid ? match.user2_id : match.user1_id
  );

  // Userテーブルからマッチしたユーザーの情報を取得
  const matchedUsers: Users[] = await prisma.users.findMany({
    where: {
      user_id: {
        in: matchedUserIds,
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

export const checkUserExistsService = async (user_id: string): Promise<boolean> => {
  // 特定のユーザーIDが存在するかを確認
  const user = await prisma.users.findUnique({
    where: {
      user_id: user_id,
    },
  });

  return !!user;
};

// 出身地を引数に取り、その出身地のユーザーを取得する関数
export const getSamePlaceUsersService = async (
  place: string
): Promise<Users[]> => {
  // 特定のユーザーIDが存在するかを確認
  const users = await prisma.users.findMany({
    where: {
      place: place,
    },
  });

  return users;
};

// 年齢を引数に取り、その年齢のユーザーを取得する関数
export const getSameAgeUsersService = async (age: string): Promise<Users[]> => {
  // 特定のユーザーIDが存在するかを確認
  const users = await prisma.users.findMany({
    where: {
      age: age,
    },
  });

  return users;
};

// 卒業年度を引数に取り、その卒業年度のユーザーを取得する関数
export const getSameGraduateYearUsersService = async (
  graduate: string
): Promise<Users[]> => {
  // 特定のユーザーIDが存在するかを確認
  const users = await prisma.users.findMany({
    where: {
      graduate: graduate,
    },
  });

  return users;
};

// 希望職種を引数に取り、その希望職種のユーザーを取得する関数
export const getSameJobTypeUsersService = async (
  desired_occupation: string
): Promise<Users[]> => {
  // 特定のユーザーIDが存在するかを確認
  const users = await prisma.users.findMany({
    where: {
      desired_occupation: desired_occupation,
    },
  });

  return users;
};

// 1位の技術を引数に取り、その技術の一致度の高いユーザーを取得する関数
