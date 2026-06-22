# Enterprise Invoice Generator

A modern SaaS-style Invoice Management System built using React, TypeScript, Redux Toolkit, and Tailwind CSS. The application allows businesses to manage customers, generate invoices, preview invoices, and export professional PDF invoices.

---

## Features

### Authentication UI

* Login Page
* Register Page
* Protected Dashboard Layout
* Sidebar Navigation
* React Router Integration

### Customer Management

* Add Customers
* View Customer List
* Delete Customers
* Redux State Management

### Invoice Management

* Create Invoices
* Dynamic Line Items
* Customer Selection from Dropdown
* Automatic Tax Calculation
* Automatic Total Calculation
* Save Invoices
* View Invoice Details
* Delete Invoices

### Invoice Preview

* Professional Invoice Layout
* Customer Information
* Invoice Metadata
* Itemized Billing Table
* Tax & Total Summary

### PDF Export

* Generate Invoice PDFs
* Download Invoice as PDF
* High Quality Rendering using html2canvas and jsPDF

### State Management

* Redux Toolkit
* Separate Slices for:

  * Authentication
  * Customers
  * Invoices

---

## Tech Stack

### Frontend

* React 19
* Vite
* TypeScript
* Redux Toolkit
* React Router DOM
* Tailwind CSS
* jsPDF
* html2canvas

### Planned Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

### Planned Cloud & DevOps

* AWS S3
* Docker
* Nginx
* GitHub Actions
* MongoDB Atlas

---

## Project Structure

```text
src
│
├── app
│   ├── store.ts
│   └── hooks.ts
│
├── components
│
│   ├── layout
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   └── DashboardLayout.tsx
│
│   ├── invoice
│   │   └── InvoicePreview.tsx
│
│   └── common
│       ├── Button.tsx
│       └── Input.tsx
│
├── features
│
│   ├── auth
│   │   └── authSlice.ts
│
│   ├── customers
│   │   └── customerSlice.ts
│
│   └── invoices
│       └── invoiceSlice.ts
│
├── pages
│
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── Customers.tsx
│   ├── Invoices.tsx
│   ├── CreateInvoice.tsx
│   └── InvoiceDetails.tsx
│
├── routes
│   └── AppRoutes.tsx
│
├── utils
│   └── pdfGenerator.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## Invoice Workflow

```text
Add Customer
      ↓
Create Invoice
      ↓
Select Customer
      ↓
Add Items
      ↓
Calculate Total
      ↓
Save Invoice
      ↓
View Invoice
      ↓
Download PDF
```

---

## Current Invoice Model

```typescript
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "Paid" | "Pending";
}
```

---

## Current Customer Model

```typescript
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}
```

---

## Screens Implemented

* Login Page
* Register Page
* Dashboard
* Customer Management
* Invoice List
* Create Invoice
* Invoice Preview
* Invoice Details

---

## Upcoming Features

### Frontend

* Redux Persist
* Dashboard Analytics
* Invoice Status Updates
* Search & Filters
* Dark Mode
* Responsive Mobile Layout

### Backend

* Express + TypeScript API
* MongoDB Integration
* JWT Authentication
* Customer CRUD APIs
* Invoice CRUD APIs
* Protected Routes

### Cloud

* AWS S3 Invoice Storage
* Email Invoice Delivery
* Docker Deployment
* CI/CD Pipeline

### SaaS Features

* Multi-Tenant Architecture
* Role-Based Access Control
* Subscription Management
* Organization Management

---

## Installation

```bash
git clone <repository-url>

cd enterprise-invoice-generator

npm install

npm run dev
```

---

## Future Goal

Build a production-ready Enterprise Invoice SaaS Platform supporting:

* Authentication & Authorization
* Customer Relationship Management
* Invoice Generation & Tracking
* PDF Storage & Sharing
* Cloud Deployment
* Multi-Tenant SaaS Architecture
* Enterprise Analytics Dashboard
* Role-Based Access Control
* Subscription-Based Monetization

---

## Author

Dhriti Joshi

B.Tech CSE (AI & ML)
Manipal University Jaipur

Full Stack Developer | React | TypeScript | MongoDB | Node.js
