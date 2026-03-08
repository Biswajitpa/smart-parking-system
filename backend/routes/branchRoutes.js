import express from "express";
import { createBranch, getBranches } from "../controllers/branchController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", protect, getBranches);
router.post("/", protect, authorize("SUPER_ADMIN"), createBranch);
export default router;
