const User = require("../models/User");
const Order = require("../models/Order");
const Pizza = require("../models/Pizza");
const { memoryOrders } = require("./orderController");
const { memoryUsers } = require("./authController");

// Get comprehensive Dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    let totalRevenue = 0;
    let totalOrders = 0;
    let activeOrders = 0;
    let totalPizzas = 0;
    let totalUsers = 0;
    let recentOrders = [];

    try {
      totalOrders = await Order.countDocuments();
      activeOrders = await Order.countDocuments({
        orderStatus: {
          $in: ["Order Received", "Preparing", "In Kitchen", "Out for Delivery"],
        },
      });

      const revenueAgg = await Order.aggregate([
        { $match: { orderStatus: { $ne: "Cancelled" } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]);
      totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

      totalPizzas = await Pizza.countDocuments();
      totalUsers = await User.countDocuments();
      recentOrders = await Order.find().sort({ createdAt: -1 }).limit(8);
    } catch (dbErr) {
      // Offline fallback from in-memory
      totalOrders = memoryOrders.length;
      activeOrders = memoryOrders.filter((o) =>
        [
          "Order Received",
          "Preparing",
          "In Kitchen",
          "Out for Delivery",
        ].includes(o.orderStatus)
      ).length;
      totalRevenue = memoryOrders
        .filter((o) => o.orderStatus !== "Cancelled")
        .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
      totalPizzas = 16;
      totalUsers = memoryUsers.length || 1;
      recentOrders = memoryOrders.slice(0, 8);
    }

    return res.status(200).json({
      success: true,
      stats: {
        totalRevenue: Number(totalRevenue.toFixed(2)),
        totalOrders,
        activeOrders,
        totalPizzas: totalPizzas || 16,
        totalUsers: totalUsers || 1,
        recentOrders,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to load dashboard metrics.",
    });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    let users = [];
    try {
      users = await User.find().select("-password").sort({ createdAt: -1 });
    } catch (err) {
      users = memoryUsers.map((u) => ({
        _id: u._id,
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        createdAt: u.createdAt || new Date(),
      }));
    }

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user role
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be 'user' or 'admin'.",
      });
    }

    try {
      const updated = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true }
      ).select("-password");

      if (updated) {
        return res.status(200).json({
          success: true,
          message: `User role updated to ${role}.`,
          user: updated,
        });
      }
    } catch (err) {
      // fallback
    }

    const memIdx = memoryUsers.findIndex((u) => u._id === id || u.id === id);
    if (memIdx !== -1) {
      memoryUsers[memIdx].role = role;
      return res.status(200).json({
        success: true,
        message: `User role updated to ${role}.`,
        user: {
          id: memoryUsers[memIdx]._id,
          name: memoryUsers[memIdx].name,
          email: memoryUsers[memIdx].email,
          role: memoryUsers[memIdx].role,
        },
      });
    }

    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
};
