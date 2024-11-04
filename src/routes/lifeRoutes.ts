import { Router } from "express";
import { updateLifeController } from "../controllers/lifeController";

const router = Router();

router.post("/update-life", updateLifeController);

export default router;
