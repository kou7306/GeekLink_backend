import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profileController";

const router = Router();

router.post("/update-profile", updateProfile);
router.get("/get-profile/:uuid", getProfile);

export default router;
