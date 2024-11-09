import { Router } from "express";
import { getUserItems, getCurrentAvatar, updateCurrentAvatar } from "../controllers/avatarController";

const router = Router();

router.get("/items/:uuid", getUserItems);
router.get("/:uuid", getCurrentAvatar);
router.put("/:uuid", updateCurrentAvatar);

export default router;
