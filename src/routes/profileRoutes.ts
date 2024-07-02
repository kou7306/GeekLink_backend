import { Router } from "express";
import { getProfile, updateProfile, LikeStatus } from "../controllers/profileController";

const router = Router();

router.post("/update-profile", updateProfile);
router.get("/get-profile/:uuid", getProfile);
router.post("/like-status", LikeStatus)

export default router;
