import { Router } from "express";
import { updateUserRank, getUserRank } from "../controllers/rankController";

const router = Router();

router.post("/update", updateUserRank);
router.post("/user", getUserRank);

export default router;