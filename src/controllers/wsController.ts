import { Socket } from "socket.io";
import { io } from "../app";
import { saveMessage } from "../services/messageService";
import { Message } from "../models/messageModel";
import { User } from "../models/userModel";

export function chatSocketConnection(socket: Socket) {
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

export function groupChatSocketConnection(socket: Socket) {
  console.log(`A user connected with socket id ${socket.id}`);

  socket.on("joinRoom", (roomId: string) => {
    console.log(`User ${socket.id} joined room: ${roomId}`);
    socket.join(roomId); // ルームに参加
  });

  socket.on("message", (message: Message) => {
    console.log(`Received message from ${socket.id} : ${message}`);
    saveMessage(message); // メッセージを保存
    // ルームに参加している全てのユーザーをログで出力する
    io.of("/ws/group-chat").to(message.room_id).emit("message", message); // 同じルームのクライアントにメッセージを送信
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
}

// オンラインユーザーのリストを保持
let onlineUsers: { [socketId: string]: User } = {};

export function onlineWorkSocketConnection(socket: Socket) {
  console.log(`A user connected with socket id ${socket.id}`);

  // ユーザーが接続した時にオンラインリストに追加
  socket.on("registerUser", (user: User) => {
    // ユーザー情報をオンラインリストに追加
    onlineUsers[socket.id] = user;
    console.log(`User registered: ${user.name}`);
  });

  // ユーザーが切断した際にオンラインリストから削除
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);

    // オンラインユーザーリストから削除
    delete onlineUsers[socket.id];
  });
}
