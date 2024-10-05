import { Router } from "express";
import { getUserRank } from "../controllers/rankController";

const router = Router();

router.post("/user", getUserRank);

export default router;