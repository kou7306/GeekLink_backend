import { supabase } from "../config/db";
import { User } from "../models/userModel";

export const updateProfileService = async (user_id: string, profileData: User) => {
  console.log("user_id", user_id);
  console.log("profileData", profileData);

  const { data, error } = await supabase
    .from("users")
    .update(profileData)
    .eq("user_id", user_id)
    .select("*")

  console.log("user", data);

  if (error) {
    console.error("error_code", error.code);
    console.error("error_hint", error.hint);
    console.error("error_message", error.message);
    console.error("error_details", error.details);
    throw new Error(error.message);
  }

  return data;
};

export const getProfileService = async (user_id: string): Promise<User | null> => {
  const { data: user, error } = await supabase.from("users").select("*").eq("user_id", user_id).single();

  if (error) throw error;

  return user;
};
