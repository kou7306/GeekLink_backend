import { Request, Response } from "express";
import { qiitaCallBackService } from "../services/qiitaService";

export const qiitaCallBack = async (req: Request, res: Response) => {
  const { uuid, code } = req.body;
  try {
    const client_id = process.env.QIITA_CLIENT_ID;
    const client_secret = process.env.QIITA_CLIENT_SECRET;
    if (client_id == undefined || client_secret == undefined) return;
    await qiitaCallBackService(uuid, code, client_id, client_secret);
    res.status(200).json({ message: "Likes created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
