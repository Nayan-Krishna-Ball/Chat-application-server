//
const router = require("express").Router();
const User = require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinary = require("./../cloudinary");

router.get("/get-user-info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    res.send({
      message: "User info fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.userId } });
    res.send({
      message: "Users info fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.post("/upload-profile-pic", authMiddleware, async (req, res) => {
  try {
    const image = req.body.image;

    //upload image to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "Chat-application",
    });

    // uplopad the url in user model
    const user = await User.findByIdAndUpdate(
      { _id: req.user.userId },
      { profilePicture: uploadedImage.secure_url },
      { returnDocument: "after" },
    );
    res.send({
      message: "Profic picture uploaded successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;
