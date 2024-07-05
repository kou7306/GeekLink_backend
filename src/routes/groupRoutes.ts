import { Router } from "express";
import {
  getGroupMessages,
  getGroupMembers,
  addGroupMember,
  createGroup,
  getGroupList
} from "../controllers/groupController";

const router = Router();

router.get("/group-list", getGroupList)
router.get("/get-group-messages", getGroupMessages);
router.get("/get-group-members", getGroupMembers);
router.post("/add-group-members", addGroupMember);
router.post("/create-group", createGroup);

export default router;
