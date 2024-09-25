import { Router } from "express";
import { followUser, unFollowUser } from "../controllers/followController";

const router = Router();

router.post("/follow-user", followUser);
router.post("/unfollow-user", unFollowUser);

export default router;
