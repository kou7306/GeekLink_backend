import { Router } from "express";
import { createLike } from "../controllers/likeController";

const router = Router();

router.post("/create-like", createLike);

export default router;
