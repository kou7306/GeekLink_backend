import { Request, Response } from "express";
import { exchangeCodeForSessionService } from "../services/authService";

export const exchangeCodeForSession = async (req: Request, res: Response) => {
  const { code, next } = req.query;
  const origin = req.get("origin");

  if (typeof code !== "string" || !origin) {
    return res.status(400).json({ error: "Invalid request parameters" });
  }

  try {
    const redirectUrl = await exchangeCodeForSessionService(code, next as string, origin);
    return res.redirect(redirectUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to exchange code for session" });
  }
};
