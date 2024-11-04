import { Router } from "express";
import { getProfile, updateProfile, followStatus } from "../controllers/profileController";

const router = Router();

router.post("/update-profile", updateProfile);
router.get("/get-profile/:uuid", getProfile);
router.post("/follow-status", followStatus)

export default router;
