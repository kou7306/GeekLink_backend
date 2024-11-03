import { Router } from "express";
import { updateCoin } from "../controllers/rpgController";

const router = Router();

router.post("/coin", updateCoin);

export default router;