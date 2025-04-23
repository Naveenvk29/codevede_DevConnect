import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
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
    await user.save();
    const token = user.generateToken(user._id);
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

export {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
