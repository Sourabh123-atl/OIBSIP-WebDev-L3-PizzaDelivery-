const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// All admin routes require admin privileges
router.use(protect);
router.use(adminOnly);

router.get("/stats", getDashboardStats);
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);

module.exports = router;
