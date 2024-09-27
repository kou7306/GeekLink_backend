import { Router } from "express";
import { qiitaCallBack } from "../controllers/qiitaController";

const router = Router();

router.post("/callback", qiitaCallBack);

export default router;
