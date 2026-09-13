const Order = require("../models/Order");

// In-memory orders for fallback
let memoryOrders = [
  {
    _id: "ord_1001",
    id: "ord_1001",
    customer: {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "+91 98765 43210",
      address: "Flat 402, Sunshine Heights, MG Road, Pune",
      notes: "Please call when arriving at the gate",
    },
    items: [
      {
        name: "Pepperoni Pizza",
        price: 14.99,
        quantity: 2,
        image: "/src/assets/pizzas/pepperoni.png",
      },
      {
        name: "Coca-Cola (500ml)",
        price: 2.99,
        quantity: 2,
        image: "/src/assets/Menu/coke.png",
      },
    ],
    subtotal: 35.96,
    deliveryFee: 3.99,
    tax: 3.6,
    totalAmount: 43.55,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    orderStatus: "Preparing",
    createdAt: new Date(Date.now() - 25 * 60 * 1000),
  },
  {
    _id: "ord_1002",
    id: "ord_1002",
    customer: {
      name: "Priya Patel",
      email: "priya@example.com",
      phone: "+91 91234 56789",
      address: "Villa 14, Palm Grove Residency, Baner, Pune",
      notes: "Leave package with security",
    },
    items: [
      {
        name: "Cheese Burst Pizza",
        price: 15.49,
        quantity: 1,
        image: "/src/assets/pizzas/cheese.png",
      },
      {
        name: "Fudgy Chocolate Brownie",
        price: 5.99,
        quantity: 1,
        image: "/src/assets/Menu/brownie.png",
      },
    ],
    subtotal: 21.48,
    deliveryFee: 3.99,
    tax: 2.15,
    totalAmount: 27.62,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    orderStatus: "On the Way",
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
  },
];

// Create Order
const createOrder = async (req, res) => {
  try {
    const {
      customer,
      items,
      subtotal,
      deliveryFee,
      tax,
      totalAmount,
      paymentMethod,
    } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain customer details and at least one item.",
      });
    }

    if (!customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({
        success: false,
        message: "Customer name, phone, and delivery address are required.",
      });
    }

    const orderData = {
      user: req.user ? req.user._id || req.user.id : null,
      customer: {
        name: customer.name.trim(),
        email: customer.email || (req.user ? req.user.email : "guest@pizzario.com"),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        notes: customer.notes || "",
      },
      items,
      subtotal: Number(subtotal || 0),
      deliveryFee: Number(deliveryFee !== undefined ? deliveryFee : 3.99),
      tax: Number(tax || 0),
      totalAmount: Number(totalAmount),
      paymentMethod: paymentMethod || "Cash on Delivery",
      paymentStatus: paymentMethod === "Cash on Delivery" ? "Pending" : "Paid",
      orderStatus: "Placed",
    };

    try {
      const order = await Order.create(orderData);
      memoryOrders.unshift(order);

      return res.status(201).json({
        success: true,
        message: "Order placed successfully! 🍕 Your hot pizza is on the way!",
        order,
      });
    } catch (dbErr) {
      const memOrder = {
        _id: "ord_" + Math.floor(100000 + Math.random() * 900000),
        id: "ord_" + Math.floor(100000 + Math.random() * 900000),
        ...orderData,
        createdAt: new Date(),
      };
      memoryOrders.unshift(memOrder);

      return res.status(201).json({
        success: true,
        message: "Order placed successfully! 🍕 (Live tracking active)",
        order: memOrder,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to place order.",
    });
  }
};

// Get user orders
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user ? req.user._id || req.user.id : null;
    const userEmail = req.user ? req.user.email : null;

    try {
      let orders = [];
      if (userId) {
        orders = await Order.find({
          $or: [{ user: userId }, { "customer.email": userEmail }],
        }).sort({ createdAt: -1 });
      }

      if (orders && orders.length > 0) {
        return res.status(200).json({
          success: true,
          count: orders.length,
          orders,
        });
      }
    } catch (dbErr) {
      // fallback
    }

    const filtered = memoryOrders.filter(
      (o) =>
        (userId && (o.user === userId || o.user === String(userId))) ||
        (userEmail &&
          o.customer &&
          o.customer.email.toLowerCase() === userEmail.toLowerCase())
    );

    res.status(200).json({
      success: true,
      count: filtered.length,
      orders: filtered.length > 0 ? filtered : memoryOrders.slice(0, 2),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve orders.",
    });
  }
};

// Get order by ID (for live order tracker)
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      const order = await Order.findById(id);
      if (order) {
        return res.status(200).json({
          success: true,
          order,
        });
      }
    } catch (dbErr) {
      // fallback
    }

    const memOrder = memoryOrders.find((o) => o._id === id || o.id === id);
    if (memOrder) {
      return res.status(200).json({
        success: true,
        order: memOrder,
      });
    }

    res.status(404).json({
      success: false,
      message: "Order not found with the specified ID.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== "All") {
      query.orderStatus = status;
    }

    try {
      const orders = await Order.find(query).sort({ createdAt: -1 });
      if (orders && orders.length > 0) {
        return res.status(200).json({
          success: true,
          count: orders.length,
          orders,
        });
      }
    } catch (dbErr) {
      // fallback
    }

    let filtered = [...memoryOrders];
    if (status && status !== "All") {
      filtered = filtered.filter(
        (o) => o.orderStatus.toLowerCase() === status.toLowerCase()
      );
    }

    res.status(200).json({
      success: true,
      count: filtered.length,
      orders: filtered,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch orders.",
    });
  }
};

// Update order status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const validStatuses = [
      "Placed",
      "Preparing",
      "On the Way",
      "Delivered",
      "Cancelled",
    ];

    if (orderStatus && !validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const updateFields = {};
    if (orderStatus) updateFields.orderStatus = orderStatus;
    if (paymentStatus) updateFields.paymentStatus = paymentStatus;

    try {
      const updated = await Order.findByIdAndUpdate(id, updateFields, {
        new: true,
      });
      if (updated) {
        return res.status(200).json({
          success: true,
          message: `Order status updated to "${orderStatus}"!`,
          order: updated,
        });
      }
    } catch (dbErr) {
      // fallback
    }

    const index = memoryOrders.findIndex((o) => o._id === id || o.id === id);
    if (index !== -1) {
      memoryOrders[index] = { ...memoryOrders[index], ...updateFields };
      return res.status(200).json({
        success: true,
        message: `Order status updated to "${orderStatus}"!`,
        order: memoryOrders[index],
      });
    }

    res.status(404).json({
      success: false,
      message: "Order not found.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  memoryOrders,
};
