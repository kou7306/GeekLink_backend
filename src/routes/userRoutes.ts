import { Router } from "express";
import {
  checkUserExists,
  filterUsers,
  getMutualFollowUsers,
  getMessages,
  getLatestMessage,
} from "../controllers/userController";

const router = Router();

router.post("/get-mutual-follow-users", getMutualFollowUsers);
router.get("/get-messages", getMessages);
router.post("/check-user-exists", checkUserExists);
router.post("/filter-users", filterUsers);
router.get("/get-latest-messages", getLatestMessage);

export default router;
