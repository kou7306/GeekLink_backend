import { supabase } from "../config/db";
import { UserRandomResponse } from "../models/userModel";

export const getRandomMatchesService = async (user_id: string): Promise<UserRandomResponse[]> => {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .neq("user_id", user_id);

  if (error) {
    console.error("Error fetching users:", error);
    throw new Error(error.message);
  }

  const users_num = Math.min(users.length, 5);
  const randomUsers: UserRandomResponse[] = [];

  for (let i = 0; i < users_num; i++) {
    const index = Math.floor(Math.random() * users.length);
    randomUsers.push(users[index]);
    users.splice(index, 1);
  }

  return randomUsers;
};
