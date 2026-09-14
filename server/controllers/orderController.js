const Order = require("../models/Order");

// In-memory orders for offline dev fallback (Starts clean without fake/static demo orders)
let memoryOrders = [];

// Helper to generate a clean Order ID
const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${timestamp}${random}`;
};

// Create a new order (POST /api/orders)
const createOrder = async (req, res) => {
  try {
    const rawItems = req.body.orderedItems || req.body.items || [];
    const customer = req.body.customer || {};

    const userName = (
      req.body.userName ||
      customer.name ||
      (req.user ? req.user.name : "")
    ).trim();

    const email = (
      req.body.email ||
      customer.email ||
      (req.user ? req.user.email : "")
    )
      .toLowerCase()
      .trim();

    const phone = (req.body.phone || customer.phone || "").trim();
    const deliveryAddress = (
      req.body.deliveryAddress ||
      customer.address ||
      ""
    ).trim();
    const notes = (req.body.notes || customer.notes || "").trim();

    if (!userName || !deliveryAddress || rawItems.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Order must include customer name, delivery address, and at least one pizza item.",
      });
    }

    // Format ordered items to schema
    const orderedItems = rawItems.map((item) => ({
      pizzaId: String(item.pizzaId || item.pizza || item._id || item.id || ""),
      pizzaName: item.pizzaName || item.name || "Custom Pizza",
      quantity: Number(item.quantity) || 1,
      size: item.size || "Regular",
      customizations: item.customizations || "",
      itemPrice: Number(item.itemPrice !== undefined ? item.itemPrice : item.price) || 0,
      image: item.image || "",
    }));

    const subtotal = Number(
      req.body.subtotal !== undefined
        ? req.body.subtotal
        : orderedItems.reduce((acc, it) => acc + it.itemPrice * it.quantity, 0)
    );

    const deliveryFee = Number(
      req.body.deliveryFee !== undefined ? req.body.deliveryFee : 3.99
    );

    const tax = Number(
      req.body.tax !== undefined ? req.body.tax : (subtotal * 0.1).toFixed(2)
    );

    const totalAmount = Number(
      req.body.totalAmount !== undefined
        ? req.body.totalAmount
        : (subtotal + deliveryFee + tax).toFixed(2)
    );

    const paymentMethod = req.body.paymentMethod || "Cash on Delivery";
    const paymentStatus =
      req.body.paymentStatus ||
      (paymentMethod === "Cash on Delivery" ? "Pending" : "Paid");

    const orderId = req.body.orderId || generateOrderId();
    const userId = req.user ? (req.user._id || req.user.id) : (req.body.userId || null);

    const orderData = {
      orderId,
      userId,
      userName,
      email,
      phone,
      deliveryAddress,
      notes,
      orderedItems,
      subtotal,
      deliveryFee,
      tax,
      totalAmount,
      paymentMethod,
      paymentStatus,
      orderStatus: "Order Received",
    };

    try {
      const order = await Order.create(orderData);
      memoryOrders.unshift(order.toObject ? order.toObject() : order);

      return res.status(201).json({
        success: true,
        message: "Order placed successfully! 🍕 Your hot pizza is being prepared!",
        order,
      });
    } catch (dbErr) {
      console.warn("MongoDB save note (using fallback):", dbErr.message);
      const memOrder = {
        _id: "ord_" + Date.now(),
        id: "ord_" + Date.now(),
        ...orderData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryOrders.unshift(memOrder);

      return res.status(201).json({
        success: true,
        message: "Order placed successfully! 🍕 Live order tracking active!",
        order: memOrder,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to place order.",
    });
  }
};

// Get current user's order history (GET /api/orders/my-orders)
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user ? (req.user._id || req.user.id) : null;
    const userEmail = req.user ? req.user.email.toLowerCase() : null;

    if (!userId && !userEmail) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in to view your orders.",
      });
    }

    try {
      const query = {
        $or: [
          ...(userId ? [{ userId }] : []),
          ...(userEmail ? [{ email: userEmail }] : []),
        ],
      };

      const orders = await Order.find(query).sort({ createdAt: -1 });

      if (orders && orders.length > 0) {
        return res.status(200).json({
          success: true,
          count: orders.length,
          orders,
        });
      }
    } catch (dbErr) {
      console.warn("DB fetch note:", dbErr.message);
    }

    // In-memory fallback
    const filtered = memoryOrders.filter((o) => {
      const matchesUser = userId && (String(o.userId) === String(userId) || String(o.user) === String(userId));
      const matchesEmail = userEmail && o.email && o.email.toLowerCase() === userEmail;
      return matchesUser || matchesEmail;
    });

    return res.status(200).json({
      success: true,
      count: filtered.length,
      orders: filtered,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve order history.",
    });
  }
};

// Get single order by ID or orderId (GET /api/orders/:id)
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      let order;
      if (id.startsWith("ORD-")) {
        order = await Order.findOne({ orderId: id });
      } else {
        order = await Order.findOne({
          $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { orderId: id }],
        });
      }

      if (order) {
        return res.status(200).json({
          success: true,
          order,
        });
      }
    } catch (dbErr) {
      // Fallback
    }

    const memOrder = memoryOrders.find(
      (o) => o._id === id || o.id === id || o.orderId === id
    );

    if (memOrder) {
      return res.status(200).json({
        success: true,
        order: memOrder,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Order not found.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all orders for Admin (GET /api/admin/orders or GET /api/orders)
const getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};

    if (status && status !== "All") {
      query.orderStatus = status;
    }

    try {
      const orders = await Order.find(query).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: orders.length,
        orders,
      });
    } catch (dbErr) {
      console.warn("DB fetch note:", dbErr.message);
    }

    // In-memory fallback
    let filtered = [...memoryOrders];
    if (status && status !== "All") {
      filtered = filtered.filter(
        (o) => o.orderStatus.toLowerCase() === status.toLowerCase()
      );
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      orders: filtered,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve orders.",
    });
  }
};

// Update order status (Admin) (PATCH/PUT /api/admin/orders/:id/status or /api/orders/:id/status)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const validStatuses = [
      "Order Received",
      "Preparing",
      "In Kitchen",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (orderStatus && !validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid order status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const updateFields = { updatedAt: new Date() };
    if (orderStatus) updateFields.orderStatus = orderStatus;
    if (paymentStatus) updateFields.paymentStatus = paymentStatus;

    try {
      const query = {
        $or: [
          ...(id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: id }] : []),
          { orderId: id },
        ],
      };

      const updated = await Order.findOneAndUpdate(query, updateFields, {
        new: true,
      });

      if (updated) {
        // Also keep memory in sync
        const memIdx = memoryOrders.findIndex(
          (o) => String(o._id) === String(updated._id) || o.orderId === updated.orderId
        );
        if (memIdx !== -1) {
          memoryOrders[memIdx] = updated.toObject ? updated.toObject() : updated;
        }

        return res.status(200).json({
          success: true,
          message: `Order status updated to "${orderStatus || updated.orderStatus}"!`,
          order: updated,
        });
      }
    } catch (dbErr) {
      console.warn("DB update note:", dbErr.message);
    }

    // In-memory fallback
    const index = memoryOrders.findIndex(
      (o) => o._id === id || o.id === id || o.orderId === id
    );

    if (index !== -1) {
      memoryOrders[index] = { ...memoryOrders[index], ...updateFields };
      return res.status(200).json({
        success: true,
        message: `Order status updated to "${orderStatus || memoryOrders[index].orderStatus}"!`,
        order: memoryOrders[index],
      });
    }

    return res.status(404).json({
      success: false,
      message: "Order not found.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update order status.",
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
