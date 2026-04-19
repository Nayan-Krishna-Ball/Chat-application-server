//
const route = require("express").Router();
const Chat = require("../models/chat");
const authMiddleware = require("../middlewares/authMiddleware");
const Message = require("../models/message");

route.post("/create-chat", authMiddleware, async (req, res) => {
  try {
    const chat = new Chat(req.body);
    const savedChat = await chat.save();

    await savedChat.populate("members");

    res.status(201).send({
      message: "Chat created successfully",
      success: true,
      data: chat,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

route.get("/get-all-chats", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const allChats = await Chat.find({ members: { $in: userId } })
      .populate("members", "-password")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });
    res.status(200).send({
      message: "Chats fetched successfully",
      success: true,
      data: allChats,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

route.post("/clear-unread-messages", authMiddleware, async (req, res) => {
  try {
    const chatId = req.body.chatId;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).send({
        message: "Chat not found",
        success: false,
      });
    }
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { unredMessageCount: 0 },
      { new: true },
    )
      .populate("members", "-password")
      .populate("lastMessage");

    await Message.updateMany(
      {
        chat: chatId,
        read: false,
      },
      {
        read: true,
      },
    );
    res.status(200).send({
      message: "Unread messages cleared successfully",
      success: true,
      data: updatedChat,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = route;
