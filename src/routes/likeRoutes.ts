import { Router } from "express";
import {
  createLike,
  deleteLike,
  getLikedUsers,
  getUsersWhoLikedMe,
  OnecreateLike,
} from "../controllers/likeController";

const router = Router();

router.post("/create-like", createLike);
router.post("/delete-like", deleteLike);
router.post("/get-liked-users", getLikedUsers);
router.post("/get-users-who-liked-me", getUsersWhoLikedMe);
router.post("/create-like-one", OnecreateLike);

export default router;
