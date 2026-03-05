import { Router } from "express";
import { createClass, getClasses, getClassById, updateClass, deleteClass } from "../controllers/class.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.post("/classes", authMiddleware, createClass);
router.get("/classes", authMiddleware, getClasses);
router.get("/classes/:id", authMiddleware, getClassById);
router.put("/classes/:id", authMiddleware, updateClass);
router.delete("/classes/:id", authMiddleware, deleteClass);

export default router;
