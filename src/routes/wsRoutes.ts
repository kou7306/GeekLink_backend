import { Router } from "express";
import { chatWebSocket } from "../controllers/wsController";

const router = Router();

router.get("/chat", chatWebSocket);

export default router;
