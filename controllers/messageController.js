//
const Message = require("../models/message");
const Chat = require("../models/chat");
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/send-message", authMiddleware, async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();

    //update the lastMessage in chat collection
    // const currentChat = await Chat.findById(req.body.chatId);
    // currentChat.lastMessage = savedMessage._id;
    // await currentChat.save()

    const currentChat = await Chat.findOneAndUpdate(
      {
        _id: req.body.chatId,
      },
      {
        lastMessage: newMessage._id,
        $inc: { unredMessageCount: 1 },
      },
    );
    res.status(201).send({
      message: "Message sent successfully",
      success: true,
      data: newMessage,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.get("/get-messages/:chatId", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId }).sort({
      createdAt: 1,
    });
    res.status(200).send({
      message: "Messages fetched successfully",
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;
