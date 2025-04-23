import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        message: "Invalid token, please login again",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Please login to access this resource",
    });
  }
});

export { isAuthenticated };
