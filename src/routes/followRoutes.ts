import { Router } from "express";
import { followUser, unFollowUser } from "../controllers/followController";

const router = Router();

router.post("/follow-user", followUser);
router.post("/unfollow-user", unFollowUser);
router.post("/get-followed-users", getFollowedUsers);
router.post("/get-users-who-followed-me", getUsersWhoFollowedMe);
router.post("/create-follow-one", OnecreateFollow);

export default router;
