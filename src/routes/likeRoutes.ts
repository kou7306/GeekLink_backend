import { Router } from "express";
import { createLike, OnecreateLike } from "../controllers/likeController";

const router = Router();

router.post("/create-like", createLike);
router.post("/create-like-one", OnecreateLike)

export default router;
