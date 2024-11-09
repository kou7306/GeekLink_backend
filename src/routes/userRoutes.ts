import { Router } from "express";
import {
  checkUserExists,
  filterUsers,
  getMutualFollowUsers,
  getMessages,
  getLatestMessage,
  getUserData,
  getLoginBonus,
  updateWorkStatus,
  getOnlineUsers,
} from "../controllers/userController";

const router = Router();

router.get("/get-user-data", getUserData);
router.post("/get-mutual-follow-users", getMutualFollowUsers);
router.get("/get-messages", getMessages);
router.post("/check-user-exists", checkUserExists);
router.post("/filter-users", filterUsers);
router.get("/get-latest-messages", getLatestMessage);
router.get("/get-login-bonus", getLoginBonus);
router.post("/update-work-status", updateWorkStatus);
router.get("/get-online-users", getOnlineUsers);

export default router;
