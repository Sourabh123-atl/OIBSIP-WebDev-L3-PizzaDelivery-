const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verify JWT Token
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, please log in.",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "pizzario_default_secret_key_2026"
    );

    // Try finding user in database; if DB is offline, populate from token
    try {
      const user = await User.findById(decoded.id).select("-password");
      if (user) {
        req.user = user;
        return next();
      }
    } catch (err) {
      // Fallback
    }

    req.user = {
      _id: decoded.id,
      id: decoded.id,
      name: decoded.name || "User",
      email: decoded.email || "",
      role: decoded.role || "user",
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session expired or invalid token, please log in again.",
    });
  }
};

// Verify Admin Role
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }
};

// Optional Auth (for guest checkout or authenticated checkout)
const optionalProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "pizzario_default_secret_key_2026"
      );
      try {
        const user = await User.findById(decoded.id).select("-password");
        if (user) req.user = user;
      } catch (err) {
        req.user = {
          _id: decoded.id,
          id: decoded.id,
          role: decoded.role || "user",
        };
      }
    } catch (error) {
      // Ignore invalid token for optional auth
    }
  }

  next();
};

module.exports = {
  protect,
  adminOnly,
  optionalProtect,
};
