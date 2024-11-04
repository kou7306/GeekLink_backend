import { Router } from "express";
import { 
  getUserCoin,
  updateUserCoin,
  getUserItems,
  getItem,
} from "../controllers/rpgController";

const router = Router();

router.get("/coin/:uuid", getUserCoin);
router.put("/coin/:uuid", updateUserCoin);
router.get("/item/:uuid", getUserItems);
router.post("/item", getItem);

export default router;