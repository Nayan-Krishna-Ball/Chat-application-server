//
const express = require("express");
const app = express();
const authRoutes = require("./controllers/authController");
const userRoutes = require("./controllers/userController");
const chatRoutes = require("./controllers/chatController");
const messageRoutes = require("./controllers/messageController");
const cors = require("cors");

//middleware
app.use(cors());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//   }),
// );

app.use(
  express.json({
    limit: "50mb",
  }),
);

//socket io
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    // origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

//auth routes
app.use("/api/auth", authRoutes);

//user routes
app.use("/api/user", userRoutes);

//chat routes
app.use("/api/chat", chatRoutes);

//message routes
app.use("/api/message", messageRoutes);

const onlineUser = [];

//test socket connection
io.on("connection", (socket) => {
  socket.on("join-room", (userid) => {
    socket.join(userid);
  });

  socket.on("send-message", (message) => {
    io.to(message.members[0])
      .to(message.members[1])
      .emit("receive-message", message);

    io.to(message.members[0])
      .to(message.members[1])
      .emit("set-message-count", message);
  });

  socket.on("clear-unread-messages", (data) => {
    io.to(data.members[0])
      .to(data.members[1])
      .emit("message-count-cleared", data);
  });

  socket.on("user-typing", (data) => {
    io.to(data.members[0]).to(data.members[1]).emit("started-typing", data);
  });

  socket.on("user-login", (userId) => {
    if (!onlineUser.includes(userId)) {
      onlineUser.push(userId);
    }
    socket.emit("online-users", onlineUser);
  });

  socket.on("user-offline", (userId) => {
    onlineUser.splice(onlineUser.indexOf(userId), 1);
    io.emit("online-users-updated", onlineUser);
  });
});

module.exports = server;
