import { supabase } from "../config/db";
import { v4 as uuidv4 } from "uuid";
import { Like } from "../models/likeModel";
import { matchingCheck } from "./matchingService";

export const createLikeService = async (uuid: string, ids: string[]): Promise<void> => {
  const user_id = uuidv4();

  for (const id of ids) {
    const other_user_id = uuidv4();

    const row: Like = {
      user_id,
      liked_user_id: other_user_id,
      created_at: new Date(),
    };

    const { error } = await supabase.from("likes").insert(row);

    if (error) {
      console.error(error);
      continue;
    }

    await matchingCheck(user_id, other_user_id);
  }
};
