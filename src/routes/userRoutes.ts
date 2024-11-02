import { Router } from "express";
import {
  checkUserExists,
  filterUsers,
  getMatchingUsers,
  getMessages,
  getLatestMessage,
  getUserData,
} from "../controllers/userController";

const router = Router();

router.get("/get-user-data", getUserData);
router.post("/get-matching-users", getMatchingUsers);
router.get("/get-messages", getMessages);
router.post("/check-user-exists", checkUserExists);
router.post("/filter-users", filterUsers);
router.get("/get-latest-messages", getLatestMessage);

export default router;
