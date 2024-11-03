import { Router } from "express";
import { 
  getUserCoin,
  updateCoin,
} from "../controllers/rpgController";

const router = Router();

router.get("/coin/:uuid", getUserCoin);
router.post("/coin", updateCoin);

export default router;