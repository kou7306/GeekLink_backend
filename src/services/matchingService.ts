import { supabase } from "../config/db";
import { Like } from "../models/likeModel";
import { CreateMatch } from "../models/matchModel";

export const matchingCheck = async (user_id: string, other_user_id: string): Promise<void> => {
  const [filteredLikes, row_id] = await filterLikes(user_id, other_user_id);
  const [filteredOtherLikes, other_row_id] = await filterLikes(other_user_id, user_id);

  if (filteredLikes.length === 1 && filteredOtherLikes.length === 1) {
    await createMatching(user_id, other_user_id);
    await deleteLike(row_id, other_row_id);
  }
};

const filterLikes = async (user_id: string, other_user_id: string): Promise<[Like[], number]> => {
  const { data: likes, error } = await supabase.from("likes").select("*").eq("user_id", user_id);

  if (error) {
    console.error("Error fetching likes:", error);
    return [[], 0];
  }

  const filteredLikes = likes.filter((like: Like) => like.liked_user_id === other_user_id);

  if (filteredLikes.length === 0) {
    return [[], 0];
  }

  return [filteredLikes, filteredLikes[0].id];
};

const createMatching = async (user1_id: string, user2_id: string): Promise<void> => {
  const match: CreateMatch = {
    user1_id,
    user2_id,
    created_at: new Date(),
  };

  const { error } = await supabase.from("matches").insert(match);

  if (error) {
    console.error("Error creating match:", error);
  }
};

const deleteLike = async (row_id: number, other_row_id: number): Promise<void> => {
  const { error: error1 } = await supabase.from("likes").delete().eq("id", row_id);

  if (error1) {
    console.error("Error deleting like:", error1);
  }

  const { error: error2 } = await supabase.from("likes").delete().eq("id", other_row_id);

  if (error2) {
    console.error("Error deleting like:", error2);
  }
};
