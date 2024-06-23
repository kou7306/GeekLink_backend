import { Router } from "express";
import { checkUserExists, getMatchingUsers, getMessages } from "../controllers/userController";

const router = Router();

router.post("/get-matching-users", getMatchingUsers);
router.get("/get-messages/:conversationId", getMessages);
router.post("/check-user-exists", checkUserExists);

export default router;
