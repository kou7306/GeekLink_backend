import { Server, Socket } from "socket.io";
import { io } from "../app";
import { saveMessage } from "../services/messageService";
import { Message } from "../models/messageModel";

export function handleSocketConnection(socket: Socket) {
  console.log(`A user connected with socket id ${socket.id}`);

  socket.on("joinRoom", (roomId: string) => {
    console.log(`User ${socket.id} joined room: ${roomId}`);
    socket.join(roomId); // ルームに参加
  });

  socket.on("message", (message: Message) => {
    console.log(`Received message from ${socket.id} : ${message}`);
    saveMessage(message); // メッセージを保存
    // ルームに参加している全てのユーザーをログで出力する
    io.of("/ws/chat").to(message.room_id).emit("message", message); // 同じルームのクライアントにメッセージを送信
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
}
