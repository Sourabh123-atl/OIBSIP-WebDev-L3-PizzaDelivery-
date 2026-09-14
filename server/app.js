const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const pizzaRoutes = require("./routes/pizzaRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Pizzario API is operational 🍕",
    timestamp: new Date().toISOString(),
  });
});

// Production Static File Serving
if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.join(__dirname, "../client/dist");
  app.use(express.static(clientDistPath));

  // Express 5 compatible SPA fallback
  app.use((req, res, next) => {
    // If request is for an API route that wasn't matched, return 404 JSON
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({ success: false, message: "API route not found" });
    }
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
} else {
  // Test Route for development
  app.get("/", (req, res) => {
    res.json({
      success: true,
      message: "Pizzario API is running successfully 🍕",
      endpoints: {
        auth: "/api/auth",
        pizzas: "/api/pizzas",
        orders: "/api/orders",
        admin: "/api/admin",
      },
    });
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;