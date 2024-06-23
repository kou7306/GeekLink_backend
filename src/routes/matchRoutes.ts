import { Router } from "express";
import { getRandomMatches } from "../controllers/matchController";

const router = Router();

router.post("/random-match", getRandomMatches);

export default router;
