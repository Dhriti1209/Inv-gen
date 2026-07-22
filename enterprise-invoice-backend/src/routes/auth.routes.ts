import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// Protected Test Route
router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected Route Working",
  });
});

export default router;