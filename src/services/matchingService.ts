import prisma from "../config/prisma";
import { Like } from "../models/likeModel";
import { CreateMatch } from "../models/matchModel";

export const matchingCheck = async (
  user_id: string,
  other_user_id: string
): Promise<void> => {
  const [filteredLikes, row_id] = await filterLikes(user_id, other_user_id);
  const [filteredOtherLikes, other_row_id] = await filterLikes(
    other_user_id,
    user_id
  );


  if (filteredLikes.length >= 1 && filteredOtherLikes.length >= 1) {
    await createMatching(user_id, other_user_id);
  } else {
    await deleteMatching(user_id, other_user_id);
  }
};

const filterLikes = async (
  user_id: string,
  other_user_id: string
): Promise<[Like[], number]> => {
  try {
    const likes = await prisma.like.findMany({
      where: {
        user_id: user_id,
        liked_user_id: other_user_id,
      },
    });

    if (likes.length === 0) {
      return [[], 0];
    }

    return [likes, likes[0].id];
  } catch (error: any) {
    console.error("Error fetching likes:", error);
    return [[], 0];
  }
};

const createMatching = async (
  user1_id: string,
  user2_id: string
): Promise<void> => {
  const match: CreateMatch = {
    user1_id,
    user2_id,
    created_at: new Date(),
  };

  try {
    await prisma.match.create({
      data: match,
    });
  } catch (error: any) {
    console.error("Error creating match:", error);
  }
};

const deleteMatching = async (
  user1_id: string,
  user2_id: string
): Promise<void> => {
  try {
    await prisma.match.deleteMany({
      where: {
        OR: [
          {
            user1_id,
            user2_id,
          },
          {
            user1_id: user2_id,
            user2_id: user1_id,
          },
        ],
      },
    });
  } catch (error: any) {
    console.error("Error deleting match:", error);
  }
};
