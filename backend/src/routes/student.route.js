import { Router } from "express";
import { getStudents, createStudent, updateStudent, deleteStudent } from "../controllers/student.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/students", authMiddleware, getStudents);
router.post("/students", authMiddleware, createStudent);
router.put("/students/:id", authMiddleware, updateStudent);
router.delete("/students/:id", authMiddleware, deleteStudent);

export default router;
