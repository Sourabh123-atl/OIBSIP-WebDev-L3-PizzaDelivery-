const express = require("express");
const router = express.Router();
const { adminLogin } = require("../controllers/authController");
const {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
} = require("../controllers/adminController");
const {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Dedicated Admin Login route (Publicly accessible, authenticates admin credentials)
router.post("/login", adminLogin);

// All subsequent admin routes require valid JWT and admin role
router.use(protect);
router.use(adminOnly);

// Admin Dashboard & Analytics
router.get("/stats", getDashboardStats);

// Admin Orders Management (GET /api/admin/orders, PATCH /api/admin/orders/:id/status, etc.)
router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderById);
router.patch("/orders/:id/status", updateOrderStatus);
router.put("/orders/:id/status", updateOrderStatus);

// Admin User Management
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);

module.exports = router;
