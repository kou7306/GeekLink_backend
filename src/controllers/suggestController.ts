import { Request, Response } from "express";
import { getUserDataService } from "../services/userService";
import {
  getSamePlaceUsersService,
  getSameAgeUsersService,
  getSameGraduateYearUsersService,
  getSameJobTypeUsersService,
  getSameTopTechUsersService,
} from "../services/userService";
import { users } from "@prisma/client";

export const getAllSuggestUsers = async (req: Request, res: Response) => {
  const uuid = req.query.uuid as string;
  try {
    const userData = await getUserDataService(uuid);
    if (userData !== null) {
      const samePlaceUsers = await getSamePlaceUsersService(
        userData.place,
        uuid
      );
      const sameAgeUsers = await getSameAgeUsersService(userData.age, uuid);
      const sameGraduateYearUsers =
        userData.graduate !== null
          ? await getSameGraduateYearUsersService(userData.graduate, uuid)
          : [];
      const sameJobTypeUsers =
        userData.desired_occupation !== null
          ? await getSameJobTypeUsersService(userData.desired_occupation, uuid)
          : [];
      const sameTopTechUsers = await getSameTopTechUsersService(
        userData.top_tech,
        uuid
      );

      //総合的なおすすめはそれぞれのサジェスト配列から取り出してカウントして、それを元にソートする
      const userScores = new Map<string, { user: users; score: number }>();

      function addUserToMap(userList: users[], score: number) {
        userList.forEach((user) => {
          if (userScores.has(user.user_id)) {
            const existingUser = userScores.get(user.user_id);
            if (existingUser !== undefined) {
              userScores.set(user.user_id, {
                user,
                score: existingUser.score + score,
              });
            }
          } else {
            userScores.set(user.user_id, { user, score });
          }
        });
      }

      addUserToMap(samePlaceUsers, 1);
      addUserToMap(sameAgeUsers, 1);
      addUserToMap(sameGraduateYearUsers, 1);
      addUserToMap(sameJobTypeUsers, 1);
      addUserToMap(sameTopTechUsers, 1);

      // スコアに基づいてソートする
      const sortedUsers = Array.from(userScores.values())
        .sort((a, b) => b.score - a.score) // スコアの降順にソート
        .map((entry) => ({
          user: entry.user, // ユーザーオブジェクト
          score: entry.score, // スコア
        }));

      res.status(200).json({
        samePlaceUsers,
        sameAgeUsers,
        sameGraduateYearUsers,
        sameJobTypeUsers,
        sameTopTechUsers,
        sortedUsers,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
