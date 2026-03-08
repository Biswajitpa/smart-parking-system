import express from "express";
import { initializeLayout } from "../controllers/layoutController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/initialize", protect, authorize("SUPER_ADMIN","ADMIN"), initializeLayout);
export default router;
