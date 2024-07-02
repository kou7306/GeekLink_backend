import { Router } from "express";
import { createLike, getLikedUsers, getUsersWhoLikedMe } from "../controllers/likeController";

const router = Router();

router.post("/create-like", createLike);
router.post("/get-liked-users", getLikedUsers);
router.post("/get-users-who-liked-me", getUsersWhoLikedMe);

export default router;
