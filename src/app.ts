import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import likeRoutes from "./routes/likeRoutes";
import matchRoutes from "./routes/matchRoutes";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { handleSocketConnection } from "./controllers/wsController";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});
app.use(express.json());
io.on("connection", (socket) => {
  console.log(socket.id);
});
// CORSの設定
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// ルートに対するハンドラを追加
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/likes", likeRoutes);
app.use("/match", matchRoutes);
io.of("/ws/chat").on("connection", handleSocketConnection);
export { app, server, io };
