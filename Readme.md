# 🚀 Enterprise Invoice Generator

A modern SaaS-based Invoice Management Platform built using the MERN Stack. The application enables businesses to efficiently manage companies, customers, products, invoices, and generate professional PDF invoices with secure authentication and an intuitive dashboard.

---

## 📸 Screenshots

> Add screenshots of the following pages after deployment.

- 🔐 Login Page
- <img width="958" height="434" alt="image" src="https://github.com/user-attachments/assets/b0798f1e-4f4f-4dfe-8087-7c0b3347169e" />

- 📊 Dashboard
<img width="1600" height="784" alt="WhatsApp Image 2026-07-23 at 5 19 38 PM" src="https://github.com/user-attachments/assets/0ae83745-14fe-4a0b-87dc-a9c80c702d12" />


- 👥 Customers
  <img width="1600" height="722" alt="WhatsApp Image 2026-07-23 at 5 20 04 PM" src="https://github.com/user-attachments/assets/657ff7b0-b43d-4e50-9da3-5170be9f2b54" />

- 📦 Products
  <img width="1600" height="724" alt="WhatsApp Image 2026-07-23 at 5 20 20 PM" src="https://github.com/user-attachments/assets/9c863677-ca3e-424b-ac38-422d6c8c2a05" />

- 🧾 Invoices
  <img width="1600" height="704" alt="WhatsApp Image 2026-07-23 at 5 20 35 PM" src="https://github.com/user-attachments/assets/354bfc61-357c-4180-9f0b-650b4a70a58a" />

- ➕ Create Invoice
  <img width="1600" height="734" alt="WhatsApp Image 2026-07-23 at 5 20 47 PM" src="https://github.com/user-attachments/assets/2b6492e0-9930-469b-a69c-b21cc8a30f4b" />

- 📄 Generated PDF
  <img width="935" height="358" alt="image" src="https://github.com/user-attachments/assets/f598a4cc-9a26-4e30-88f0-f08eb02305e0" />


---

# ✨ Features

### 🔐 Authentication
- JWT Authentication
- Secure Login & Registration
- Protected Routes

### 🏢 Company Management
- Create Company
- View Company Details
- Update Company Information

### 👥 Customer Management
- Add Customers
- Update Customer Details
- Delete Customers
- Search Customers

### 📦 Product Management
- Add Products
- GST & HSN Code Support
- Edit/Delete Products

### 🧾 Invoice Management
- Create Professional Invoices
- Dynamic Invoice Number Generation
- Search & Filter Invoices
- Change Invoice Status
- Delete Invoice
- View Invoice Details
- Download Invoice as PDF

### 📊 Dashboard
- Revenue Overview
- Total Customers
- Total Products
- Total Invoices
- Recent Invoices
- Color-Coded Invoice Status

### 🎨 User Interface
- Responsive Design
- Modern Dashboard
- Clean Navigation
- Color-coded Invoice Status
- Professional Invoice Preview

---

# 🛠 Tech Stack

## Frontend

- React.js
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

## PDF Generation

- PDFKit

---

# 📂 Folder Structure

```
enterprise-invoice-generator/

├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   └── server.ts
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── layouts/
│   │   └── App.tsx
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Dhriti1209/Inv-gen.git

cd enterprise-invoice-generator
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_ATLAS_URI

JWT_SECRET=YOUR_SECRET_KEY
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/v1/auth/register

POST /api/v1/auth/login
```

---

## Company

```
POST /api/v1/company

GET /api/v1/company

PUT /api/v1/company/:id
```

---

## Customers

```
GET /api/v1/customers

POST /api/v1/customers

PUT /api/v1/customers/:id

DELETE /api/v1/customers/:id
```

---

## Products

```
GET /api/v1/products

POST /api/v1/products

PUT /api/v1/products/:id

DELETE /api/v1/products/:id
```

---

## Invoices

```
GET /api/v1/invoices

POST /api/v1/invoices

GET /api/v1/invoices/:id

PUT /api/v1/invoices/:id

PATCH /api/v1/invoices/:id/status

DELETE /api/v1/invoices/:id

GET /api/v1/invoices/:id/pdf
```

---

# 🚀 Future Enhancements

- Dashboard Charts
- Email Invoice to Customer
- Company Logo Upload
- Excel Export
- Pagination
- Dark Mode
- Payment Tracking
- Multi-Company Support
- Role-Based Access Control (RBAC)

---

# 📖 What I Learned

- Building a full-stack SaaS application using the MERN stack.
- Implementing secure JWT authentication.
- Designing scalable REST APIs with Express and TypeScript.
- Managing MongoDB relationships using Mongoose.
- Generating professional PDF invoices dynamically.
- Building responsive user interfaces with React and Tailwind CSS.
- Implementing search, filtering, and invoice status management.

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to fork this repository and submit a pull request.

---

# 👩‍💻 Author

**Dhriti Joshi**

B.Tech CSE (AI & ML)

Manipal University Jaipur

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub!
