import { Router } from "express";
import { RandomCreateLike, OneCreateLike } from "../controllers/likeController";

const router = Router();

router.post("/create-like-random", RandomCreateLike);
router.post("/create-like-one", OneCreateLike)

export default router;
