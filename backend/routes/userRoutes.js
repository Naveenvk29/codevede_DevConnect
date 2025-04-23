import express from "express";
import {
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
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/").get(isAuthenticated, getAllUsers);
router
  .route("/profile")
  .get(isAuthenticated, getUserProfile)
  .put(isAuthenticated, updateUserProfile)
  .delete(isAuthenticated, deleteUser);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgetPassword);
router.post("/reset-password", resetpassword);
export default router;
