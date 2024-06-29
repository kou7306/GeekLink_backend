import { Request, Response } from "express";
import { Server as SocketIOServer } from "socket.io";
import { handleWebSocketConnection } from "../services/wsService";

export const connectWebSocket = (
  req: Request,
  res: Response,
  io: SocketIOServer
) => {
  const { roomId } = req.query;

  if (typeof roomId !== "string") {
    return res.status(400).json({ error: "Invalid conversation ID" });
  }

  const room = io.of("/room");

  room.on("connection", (socket) => {
    console.log("A user connected to /room");

    socket.on("joinRoom", (roomId: string) => {
      if (typeof roomId !== "string") {
        return socket.emit("error", { message: "Invalid room ID" });
      }

      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on("message", (roomId: string, message: string) => {
      room.to(roomId).emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected from /room");
    });
  });
  res.status(200).json({ message: "WebSocket connection established" });
};
