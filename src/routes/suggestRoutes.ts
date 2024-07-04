import { Router } from "express";
import { getAllSuggestUsers } from "../controllers/suggestController";

const router = Router();

router.get("/all", getAllSuggestUsers);

export default router;
