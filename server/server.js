process.on("uncaughtException", (err) => {
  console.error("💥 UNCAUGHT EXCEPTION:", err);
  process.exit(1);
});
process.on("unhandledRejection", (reason) => {
  console.error("💥 UNHANDLED REJECTION:", reason);
  process.exit(1);
});

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();


const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const discoverRoutes = require("./routes/discover");
const swipeRoutes = require("./routes/swipes");
const matchRoutes = require("./routes/matches");
const messageRoutes = require("./routes/messages");

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
  "http://localhost:3001"
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      const isAllowed = allowedOrigins.some(ao => origin.startsWith(ao));
      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn(`⚠️ Socket connection blocked by CORS from origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // Allow polling as fallback, upgrade to websocket
});

console.log("🌐 Socket.io initialized. Allowed Origins:", allowedOrigins);

// Attach io to app for access in routes
app.set("io", io);

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/discover", discoverRoutes);
app.use("/api/swipes", swipeRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);

app.get("/health", (req, res) => res.json({ status: "ok", app: "GitTogether API" }));

// Socket.io integration
io.on("connection", (socket) => {
  console.log("👤 User connected:", socket.id);

  socket.on("join-room", (matchId) => {
    socket.join(matchId);
    const roomSize = io.sockets.adapter.rooms.get(matchId)?.size || 0;
    console.log(`🏠 Socket ${socket.id} joined room: ${matchId}. Total in room: ${roomSize}`);
  });

  socket.on("disconnect", () => {
    console.log("👤 User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 GitTogether API with Sockets running on http://localhost:${PORT}`);
});
