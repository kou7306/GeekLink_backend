import { Router } from "express";
import { qiitaOauth,qiitaCallBack } from "../controllers/qiitaController"

const router = Router();

router.post("/oauth", qiitaOauth);
router.post("/allback", qiitaCallBack)

export default router;
