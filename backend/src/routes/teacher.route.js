import { Router } from "express";
import { getTeachers, createTeacher, updateTeacher, deleteTeacher } from "../controllers/teacher.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/teachers", authMiddleware, getTeachers);
router.post("/teachers", authMiddleware, createTeacher);
router.put("/teachers/:id", authMiddleware, updateTeacher);
router.delete("/teachers/:id", authMiddleware, deleteTeacher);

export default router;
