import { Router } from "express";
import { createRole, getRoles } from "../controllers/role.controller.js";
const router = Router();

// Define your user routes here
router.post('/roles',createRole);
router.get('/roles',getRoles);



export default router;
