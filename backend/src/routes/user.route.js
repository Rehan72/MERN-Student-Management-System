import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

// Define your user routes here
router.post("/user", register);
router.post("/login", login);
router.post('/create-user', authMiddleware, register);

export default router;
