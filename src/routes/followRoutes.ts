import { Router } from "express";
import {
  addFollow,
  deleteFollow,
  getFollowNum,
  getFollows,
  addFollowOne,
} from "../controllers/followController";

const router = Router();

router.post("/add-follow", addFollow);
router.post("/delete-follow", deleteFollow);
router.post("/get-follows-num", getFollowNum);
router.post("/get-follows", getFollows);
router.post("/add-follow-one", addFollowOne);

export default router;
