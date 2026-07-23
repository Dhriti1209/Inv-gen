import authRoutes from "./routes/auth.routes";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import companyRoutes from "./routes/company.routes";
import customerRoutes from "./routes/customer.routes";
import productRoutes from "./routes/product.routes";
import invoiceRoutes from "./routes/invoice.routes";
import dashboardRoutes from "./routes/dashboard.routes";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/invoices", invoiceRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);


// Health Check Route
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Enterprise Invoice API is running 🚀",
  });
});

export default app;