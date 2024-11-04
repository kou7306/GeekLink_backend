import { Router } from "express";
import {
  getUserCoin,
  updateUserCoin,
  getUserItems,
  getItem,
  getUserPosition,
  updateUserPosition,
} from "../controllers/rpgController";

const router = Router();

router.get("/coin/:uuid", getUserCoin);
router.put("/coin/:uuid", updateUserCoin);
router.get("/item/:uuid", getUserItems);
router.post("/item", getItem);
router.get("/position/:uuid", getUserPosition);
router.put("/position/:uuid", updateUserPosition);

export default router;
