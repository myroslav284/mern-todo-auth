import express from "express";
import { getMe, login, signup } from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";
import { loginValidation, signupValidation } from "../middleware/validation.js";
import handleValidationErrors from "../middleware/handleValidationErrors.js";

const router = express.Router();

router.post("/auth/login", loginValidation, handleValidationErrors, login);
router.post("/auth/signup", signupValidation, handleValidationErrors, signup);
router.get("/auth/me", userAuth, getMe);

export default router;
