import { Router } from "express";
import { protect } from "../middleware/auth.middleware";

import {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  updateInvoiceStatus,
  deleteInvoice,
} from "../controllers/invoice.controller";

const router = Router();

router.post("/", protect, createInvoice);

router.get("/", protect, getInvoices);

router.get("/:id", protect, getInvoiceById);

router.put("/:id", protect, updateInvoice);

router.delete("/:id", protect, deleteInvoice);

router.patch("/:id/status", protect, updateInvoiceStatus);
export default router;