import { Router } from "express";
import {
  getPost,
  createPost,
  addReaction,
} from "../controllers/timelineController";

const router = Router();

router.get("/post", getPost);
router.post("/create-post", createPost);
router.post("/add-reaction", addReaction);

export default router;
