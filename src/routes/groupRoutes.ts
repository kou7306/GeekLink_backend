import { Router } from "express";
import { getGroupMessages } from "../controllers/groupController";

const router = Router();

router.get("/get-group-messages", getGroupMessages);

export default router;
