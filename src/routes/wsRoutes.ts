import { Router } from "express";
import { connectWebSocket } from "../controllers/wsController";

const router = Router();

router.get("/connect", connectWebSocket);

export default router;
