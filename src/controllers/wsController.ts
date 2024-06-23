import { Request, Response } from "express";
import WebSocket from "ws";
import { handleWebSocketConnection } from "../services/wsService";

export const connectWebSocket = (req: Request, res: Response) => {
  const { conversationId } = req.query;

  if (typeof conversationId !== "string") {
    return res.status(400).json({ error: "Invalid conversation ID" });
  }

  const wsServer = new WebSocket.Server({ noServer: true });
  wsServer.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
    handleWebSocketConnection(ws, conversationId);
  });

  wsServer.on("connection", (ws) => {
    ws.send("WebSocket connection established");
  });

  res.status(200).json({ message: "WebSocket connection established" });
};
