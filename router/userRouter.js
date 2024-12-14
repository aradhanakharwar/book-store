import express from "express";
import { login, register, verifyOtp } from "../controller/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verifyotp", verifyOtp);
router.post("/login", login);

export default router;