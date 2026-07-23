import express from "express";
import { protect } from "../middleware/auth.middleware";
import { getDashboardData } from "../controllers/dashboard.controller";

const router = express.Router();

router.get("/", protect, getDashboardData);

export default router;