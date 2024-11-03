import { Router } from "express";
import { 
  getUserCoin,
  updateUserCoin,
} from "../controllers/rpgController";

const router = Router();

router.get("/coin/:uuid", getUserCoin);
router.put("/coin/:uuid", updateUserCoin);

export default router;