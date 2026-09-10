import express from "express";
import {
  getUser,
  login,
  logout,
  register,
} from "../controllers/authcontroller.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", getUser);

export default router;
