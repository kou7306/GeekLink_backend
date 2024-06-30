import prisma from "../config/prisma";
import { Users, Message, Match } from "@prisma/client";
// import { User } from "../models/userModel";
// import { Match } from "../models/matchModel";
// import { Message } from "../models/messageModel";

export const getMatchingUsersService = async (
  uuid: string
): Promise<Users[]> => {
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

export const checkUserExistsService = async (
  user_id: string
): Promise<boolean> => {
  // 特定のユーザーIDが存在するかを確認
  const user = await prisma.users.findUnique({
    where: {
      user_id: user_id,
    },
  });

  return !!user;
};
