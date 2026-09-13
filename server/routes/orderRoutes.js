const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const {
  protect,
  adminOnly,
  optionalProtect,
} = require("../middleware/authMiddleware");

// Customer Order Placement & History
router.post("/", optionalProtect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", getOrderById);

// Admin Order Management
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;
