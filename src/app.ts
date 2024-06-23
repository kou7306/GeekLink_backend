import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import likeRoutes from "./routes/likeRoutes";
import matchRoutes from "./routes/matchRoutes";
import wsRoutes from "./routes/wsRoutes";

dotenv.config();

const app = express();
app.use(express.json());

// CORSの設定
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}

app.use(cors(corsOptions));

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/likes", likeRoutes);
app.use("/match", matchRoutes);
app.use("/ws", wsRoutes);

export default app;
