import { supabase } from "../config/db";
import { User } from "../models/userModel";
import { Match } from "../models/matchModel";
import { Message } from "../models/messageModel";

export const getMatchingUsersService = async (uuid: string): Promise<User[]> => {
  const { data: matches, error: matchError } = await supabase
    .from("matches")
    .select("*")
    .or(`user1_id.eq.${uuid},user2_id.eq.${uuid}`)
    .returns<Match[]>();

  if (matchError) throw matchError;

  const matchedUserIds = matches!.flatMap((match) =>
    match.user1_id === uuid ? match.user2_id : match.user1_id
  );

  const { data: matchedUsers, error: userError } = await supabase
    .from("users")
    .select("*")
    .in("user_id", matchedUserIds)
    .returns<User[]>();

  if (userError) throw userError;

  return matchedUsers;
};

export const getMessagesService = async (conversationId: string): Promise<Message[]> => {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .returns<Message[]>();

  if (error) throw error;

  return messages;
};

export const checkUserExistsService = async (user_id: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from("users")
    .select("name")
    .eq("user_id", user_id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data !== null && data.name !== null;
};
