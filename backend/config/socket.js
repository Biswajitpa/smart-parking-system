import { Server } from "socket.io";

let io;
export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: { origin: process.env.FRONTEND_URL || "http://localhost:5173", methods: ["GET","POST"] }
  });
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
  });
  return io;
};
export const getIO = () => io;
