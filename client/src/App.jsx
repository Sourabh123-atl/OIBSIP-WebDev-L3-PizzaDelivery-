import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";

// Customer Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import MyOrders from "./pages/MyOrders/MyOrders";
import OrderTracking from "./pages/OrderTracking/OrderTracking";

// Dedicated Admin Pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminMenu from "./pages/Admin/AdminMenu";
import AdminUsers from "./pages/Admin/AdminUsers";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Customer Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/order-tracking/:id" element={<OrderTracking />} />

            {/* Customer Protected Routes */}
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />

            {/* Admin Dedicated Authentication Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Protected Routes */}
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/menu"
              element={
                <AdminRoute>
                  <AdminMenu />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/inventory"
              element={
                <AdminRoute>
                  <AdminMenu />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              }
            />

            {/* Catch All Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Toast notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
