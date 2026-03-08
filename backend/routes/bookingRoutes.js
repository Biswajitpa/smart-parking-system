import express from "express";
import { createBooking, getBookings } from "../controllers/bookingController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", protect, getBookings);
router.post("/", protect, authorize("SUPER_ADMIN","ADMIN","STAFF"), createBooking);
export default router;
