import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/userControllers.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

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

export default router;
