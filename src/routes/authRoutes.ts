import { Router } from "express";
import { exchangeCodeForSession } from "../controllers/authController";

const router = Router();

router.get("/exchange-code", exchangeCodeForSession);

export default router;
