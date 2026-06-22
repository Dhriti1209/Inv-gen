import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Invoices from "../pages/Invoices";
import CreateInvoice from "../pages/CreateInvoice";

import DashboardLayout from "../components/layout/DashboardLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Layout Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route
            path="/invoices/create"
            element={<CreateInvoice />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;