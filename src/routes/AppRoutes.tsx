import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Invoices from "../pages/Invoices";
import CreateInvoice from "../pages/CreateInvoice";
import InvoiceDetails from "../pages/InvoiceDetails";

import DashboardLayout from "../components/layout/DashboardLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard Layout */}
        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
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

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;