import { Router } from "express";
import {
  getPosts,
  createPost,
  addReaction,
} from "../controllers/timelineController";

const router = Router();

router.get("/post", getPosts);
router.post("/create-post", createPost);
router.post("/add-reaction", addReaction);

export default router;
