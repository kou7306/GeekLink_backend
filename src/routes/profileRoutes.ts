import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profileController";

const router = Router();

router.post("/update-profile", updateProfile);
router.get("/get-profile/:user_id", getProfile);

export default router;
