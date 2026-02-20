import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.js";
import { deleteUser, getUser, updateUser } from "../controllers/user.controller.js";

const router = Router();

// Define your user routes here
router.post("/auth/user", register);
router.post("/auth/login", login);
router.post('/create-user', authMiddleware, register);
router.put('/update-user', authMiddleware, updateUser);
router.delete('/delete-user', authMiddleware, deleteUser);
router.get('/get-user', authMiddleware, getUser);

export default router;
