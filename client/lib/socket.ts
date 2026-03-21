import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export const socket = io(SOCKET_URL, {
    autoConnect: false,
    withCredentials: true,
    transports: ["websocket"], // Force WebSocket to avoid polling issues in production
});

// Debug logs
socket.on("connect", () => console.log("✅ Socket connected:", socket.id));
socket.on("connect_error", (err) => console.error("❌ Socket connection error:", err.message));
socket.on("disconnect", (reason) => console.warn("⚠️ Socket disconnected:", reason));
