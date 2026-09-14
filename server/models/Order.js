const mongoose = require("mongoose");

const orderedItemSchema = new mongoose.Schema({
  pizzaId: {
    type: String,
  },
  pizzaName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  size: {
    type: String,
    default: "Regular",
  },
  customizations: {
    type: String,
    default: "",
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.Mixed,
      ref: "User",
      required: false,
      index: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: "",
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    orderedItems: [orderedItemSchema],
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    deliveryFee: {
      type: Number,
      default: 3.99,
    },
    tax: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: "Cash on Delivery",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: [
        "Order Received",
        "Preparing",
        "In Kitchen",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Order Received",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
