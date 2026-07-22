import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";
import Company from "../pages/Company";
import Customers from "../pages/Customers";
import Invoices from "../pages/Invoices";
import CreateInvoice from "../pages/CreateInvoice";
import InvoiceDetails from "../pages/InvoiceDetails";
import Products from "../pages/Products";

import DashboardLayout from "../components/layout/DashboardLayout";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Routes */}
        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/company"
            element={<Company />}
          />

          <Route
            path="/customers"
            element={<Customers />}
          />

          <Route
            path="/invoices"
            element={<Invoices />}
          />

          <Route
            path="/invoices/create"
            element={<CreateInvoice />}
          />

          <Route
            path="/invoices/:id"
            element={<InvoiceDetails />}
          />

        </Route>
        <Route
  path="/products"
  element={<Products />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;