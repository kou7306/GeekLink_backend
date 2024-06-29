import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import { config } from "./config/config";

const PORT = config.port;
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // 適切なオリジンを設定してください
  },
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("A user connected");
});
