import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import likeRoutes from "./routes/likeRoutes";
import matchRoutes from "./routes/matchRoutes";
import suggestRoutes from "./routes/suggestRoutes";
import groupRoutes from "./routes/groupRoutes";
import timelineRoutes from "./routes/timelineRoutes";
import eventRoutes from "./routes/eventRoutes";
import githubRoutes from "./routes/githubRoute";
import qiitaRoutes from "./routes/qiitaRoutes";
import activityRoutes from "./routes/activityRoutes";
import rankRoutes from "./routes/rankRoutes";
import rankingRoutes from "./routes/rankingRoutes";
import lifeRoutes from "./routes/lifeRoutes";
import followRoutes from "./routes/followRoutes";
import rpgRoutes from "./routes/rpgRoutes";
import avatarRoutes from "./routes/avatarRoutes";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { chatSocketConnection, groupChatSocketConnection } from "./controllers/wsController";

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
  methods: ["*"],
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
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
app.use("/suggest", suggestRoutes);
app.use("/group", groupRoutes);
app.use("/timeline", timelineRoutes);
app.use("/events", eventRoutes);
app.use("/github", githubRoutes);
app.use("/qiita", qiitaRoutes);
app.use("/activity", activityRoutes);
app.use("/rank", rankRoutes);
app.use("/ranking", rankingRoutes);
app.use("/life", lifeRoutes);
app.use("/follow", followRoutes);
app.use("/rpg", rpgRoutes);
app.use("/avatar", avatarRoutes);
io.of("/ws/chat").on("connection", chatSocketConnection);
io.of("/ws/group-chat").on("connection", groupChatSocketConnection);

export { app, server, io };
