import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  // console.log(username, password, email);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  const user = new User({
    username,
    email,
    password,
  });
  try {
    user.verificationToken = crypto.randomBytes(32).toString("hex");
    await user.save();
    const token = user.generateToken(user._id);
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${user.verificationToken}`;

    // console.log("Sending verification email to:", user.email);
    // console.log("Verification URL:", verifyUrl);

    await sendEmail(
      user.email,
      "Verify your email",
      `<a href="${verifyUrl}">Verify Email</a>`
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
    });
    console.error("Registration Error:", error);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    const ispasswordMatch = await user.isPasswordCorrect(password);
    if (ispasswordMatch) {
      const token = user.generateToken(user._id);
      res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });
      res.status(200).json({
        message: "User logged in successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } else {
      return res.status(401).json({
        message: "user Credentials are not correct",
      });
    }
  } else {
    return res.status(401).json({
      message: "user not found",
    });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  res.status(200).json({
    message: "User logged out successfully",
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.status(200).json({
    message: "User profile fetched successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  user.password = req.body.password || user.password;
  const updatedUser = await user.save();
  res.status(200).json({
    message: "User updated successfully",
    user: {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    },
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    message: "Users fetched successfully",
    users,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  await user.deleteOne();
  res.status(200).json({
    message: "User deleted successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findOne({ verificationToken: req.query.token });

  if (!user) {
    return res.status(400).json({ message: "invaild token" });
  }
  (user.isVerified = true), (user.verificationToken = undefined);
  await user.save();
  res.status(200).json({ message: "Email verified successfully" });
});
const forgetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.resetPasswordToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${user.resetPasswordToken}`;
  await sendEmail(
    user.email,
    "Reset Your Password",
    `<a href="${resetUrl}">Reset Password</a>`
  );

  res.status(200).json({ message: "Password reset link sent" });
});

const resetpassword = asyncHandler(async (req, res) => {
  const token = req.query.token;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  user.password = req.body.newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password has been reset" });
});
export {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  verifyEmail,
  forgetPassword,
  resetpassword,
};
