# 🍕 Pizzario – Full Stack Pizza Delivery & Order Management Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

**Pizzario** is an end-to-end full-stack pizza ordering, delivery tracking, and restaurant administration platform built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). 

Developed as part of the **OASIS Infobyte Web Development and Designing Internship (OIBSIP Level 3)** by **Sourabh Patel**.

---

## 🌟 Key Features

### 👤 Customer Experience
- **Responsive Landing Page**: Hero section, signature pizzas showcase, brand highlights, limited-time promotions, and testimonials.
- **Dynamic Menu & Filtering**: Browse by categories (*Pizzas, Burgers, Pastas, Sides, Drinks, Desserts*), real-time search bar, and favorites.
- **Persistent Cart System**: Full React Context + localStorage integration. Adjust quantities, remove items, apply discount coupons (`PIZZA20` for 20% off), and real-time fee/tax calculation.
- **Seamless Checkout**: Address collection, delivery instructions, and multiple payment choices (*Cash on Delivery, Credit/Debit Card, UPI*).
- **Live 4-Stage Order Tracker**: Real-time visual progress stepper (*Order Placed ➔ In Kitchen ➔ Out for Delivery ➔ Delivered*) with automatic polling and live updates.
- **Customer Order History**: View all past orders, items ordered, payment statuses, and re-track anytime via `/my-orders`.
- **Authentication & Security**: JWT-based auth, secure password hashing (bcrypt), and password reset workflows.

### ⚡ Comprehensive Admin Panel (`/admin`)
- **Executive Dashboard**: Live KPIs tracking Total Revenue, Total Orders, Active Kitchen Orders, Menu Count, and Registered Customers with recent order overview.
- **Order Management & Dispatch**: View all incoming orders, filter by status, inspect customer address and notes, and update order statuses in real time.
- **Menu & Product CRUD**: Add new food items with custom images, categories, and descriptions; edit prices; toggle stock availability; delete discontinued items.
- **User & Permissions Directory**: Monitor customer accounts and toggle administrator privileges with one click.
- **Role-Based Access Control**: Protected routes (`AdminRoute`) ensuring only verified administrators can access the console.

---

## 🔑 Default Credentials for Instant Testing

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@pizzario.com` | `admin123` |
| **Customer** | Register a new account or sign up on the login page | Custom |

> [!TIP]
> The login screen includes a **"Use Demo Admin"** shortcut button for one-click evaluation!

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Custom Modern CSS
- **Routing**: React Router DOM v7
- **Icons**: React Icons (FontAwesome)
- **Feedback**: React Toastify

### Backend
- **Runtime**: Node.js & Express 5
- **Database**: MongoDB & Mongoose (with offline in-memory fallback)
- **Security**: JSON Web Tokens (JWT), bcrypt
- **Architecture**: RESTful API with modular controllers, routes, and middleware

---

## 📂 Project Structure

```text
OIBSIP-WebDev-L3-PizzaDelivery
│
├── client/                     # Frontend Application (React + Vite)
│   ├── src/
│   │   ├── assets/             # Pizza & food assets
│   │   ├── components/         # Navbar, Footer, PizzaCard, Hero, ProtectedRoute
│   │   ├── config/             # Dynamic API base URL configuration
│   │   ├── context/            # AuthContext & CartContext (State Management)
│   │   ├── data/               # Default menu fallback data
│   │   ├── pages/
│   │   │   ├── Home/           # Landing page
│   │   │   ├── Menu/           # Interactive menu & category filters
│   │   │   ├── Cart/           # Shopping cart & coupon discounts
│   │   │   ├── Checkout/       # Checkout & delivery details
│   │   │   ├── MyOrders/       # Customer order history
│   │   │   ├── OrderTracking/  # Live 4-stage visual order tracker
│   │   │   ├── Login/          # Sign in page
│   │   │   ├── Register/       # Sign up page
│   │   │   ├── ForgotPassword/ # Password reset request
│   │   │   ├── ResetPassword/  # New password form
│   │   │   └── Admin/          # Admin Dashboard, Orders, Menu CRUD, Users
│   │   ├── App.jsx             # Route definitions & providers
│   │   └── main.jsx            # Entry point
│   ├── package.json
│   ├── vercel.json             # Vercel deployment rewrite rules
│   └── vite.config.js
│
├── server/                     # Backend API (Express + Node)
│   ├── config/                 # Resilient MongoDB database connection
│   ├── controllers/            # authController, pizzaController, orderController, adminController
│   ├── middleware/             # authMiddleware (JWT & Admin verification)
│   ├── models/                 # User.js, Pizza.js, Order.js
│   ├── routes/                 # authRoutes, pizzaRoutes, orderRoutes, adminRoutes
│   ├── data/                   # Default seed menu
│   ├── app.js                  # Express app setup & production static serving
│   ├── server.js               # HTTP server & admin auto-seed initialization
│   └── package.json
│
├── package.json                # Monorepo build and start scripts
├── render.yaml                 # Render.com Blueprint deployment specification
└── README.md
```

---

## 🚀 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Sourabh123-atl/OIBSIP-WebDev-L3-PizzaDelivery-.git
cd OIBSIP-WebDev-L3-PizzaDelivery-
```

### 2. Install Dependencies

```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 3. Environment Variables

Create a `.env` file in the `server` directory (refer to `server/.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/pizzario
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

*(Note: If no MongoDB URI is provided, the application runs with an intelligent built-in fallback store so you can explore immediately).*

### 4. Run Development Servers

In terminal 1 (Backend):
```bash
cd server
npm run dev
```

In terminal 2 (Frontend):
```bash
cd client
npm run dev
```

Open **`http://localhost:5173`** in your browser.

---

## 🌐 Deployment Guide

### Option A: Unified Fullstack on Render (Recommended)

1. Push this repository to your GitHub account.
2. Log in to [Render.com](https://render.com) and create a **New Web Service**.
3. Select your repository `OIBSIP-WebDev-L3-PizzaDelivery-`.
4. Configure settings:
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: *(Any secure string)*
   - `MONGODB_URI`: *(Your MongoDB Atlas connection string)*
6. Click **Deploy Web Service**. Render will automatically build the React client and serve it via Express.

### Option B: Frontend on Vercel + Backend on Render

1. **Deploy Backend**: Deploy `server/` to Render or Railway. Copy the public backend URL (e.g., `https://pizzario-api.onrender.com`).
2. **Deploy Frontend on Vercel**:
   - Import your repository on [Vercel](https://vercel.com).
   - Set **Root Directory** to `client`.
   - Add environment variable `VITE_API_URL=https://pizzario-api.onrender.com/api`.
   - Deploy!

---

## 📡 REST API Documentation

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register customer account |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `POST` | `/api/auth/forgot-password`| Public | Generate password reset token |
| `POST` | `/api/auth/reset-password` | Public | Reset password with token |
| `GET` | `/api/auth/me` | User | Get current profile |
| `GET` | `/api/pizzas` | Public | Get all menu items with category filter |
| `POST` | `/api/pizzas` | Admin | Create a new menu item |
| `PUT` | `/api/pizzas/:id` | Admin | Update price, category, stock |
| `DELETE`| `/api/pizzas/:id` | Admin | Delete menu item |
| `POST` | `/api/orders` | Public/User | Place a customer order |
| `GET` | `/api/orders/my-orders` | User | Get customer order history |
| `GET` | `/api/orders/:id` | Public | Get order status for live tracking |
| `GET` | `/api/orders` | Admin | Get all orders |
| `PUT` | `/api/orders/:id/status`| Admin | Update order status |
| `GET` | `/api/admin/stats` | Admin | Get revenue, order, and user metrics |
| `GET` | `/api/admin/users` | Admin | List all registered users |
| `PUT` | `/api/admin/users/:id/role`| Admin | Toggle user role (user/admin) |

---

## 👨‍💻 Author

**Sourabh Patel**  
- **GitHub**: [@Sourabh123-atl](https://github.com/Sourabh123-atl)  
- **Project**: OASIS Infobyte Web Development & Designing Internship (OIBSIP Level 3)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
