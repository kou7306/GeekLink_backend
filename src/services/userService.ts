import prisma from "../config/prisma";
import { User, Message, Match } from "@prisma/client";
// import { User } from "../models/userModel";
// import { Match } from "../models/matchModel";
// import { Message } from "../models/messageModel";

export const getMatchingUsersService = async (uuid: string): Promise<User[]> => {
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
  const matchedUsers: User[] = await prisma.user.findMany({
    where: {
      user_id: {
        in: matchedUserIds,
      },
    },
  });

  return matchedUsers;
};

export const getMessagesService = async (conversationId: string): Promise<Message[]> => {
  // Messageテーブルから特定の会話IDに関連するメッセージを取得
  const messages: Message[] = await prisma.message.findMany({
    where: {
      conversation_id: conversationId,
    },
  });

  return messages;
};

export const checkUserExistsService = async (user_id: string): Promise<boolean> => {
  // 特定のユーザーIDが存在するかを確認
  const user = await prisma.user.findUnique({
    where: {
      user_id: user_id,
    },
  });

  return !!user;
};
