import express from "express";
import { getMonthlyReport, exportMonthlyExcel, exportMonthlyPdf } from "../controllers/reportController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/monthly", protect, authorize("SUPER_ADMIN","ADMIN"), getMonthlyReport);
router.get("/monthly/excel", protect, authorize("SUPER_ADMIN","ADMIN"), exportMonthlyExcel);
router.get("/monthly/pdf", protect, authorize("SUPER_ADMIN","ADMIN"), exportMonthlyPdf);
export default router;
