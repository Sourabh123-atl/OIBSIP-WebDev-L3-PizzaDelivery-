const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Fallback in-memory users for offline local dev mode
const memoryUsers = [];

// Initialize default in-memory admin for offline development fallback
(async () => {
  try {
    const hashedAdminPass = await bcrypt.hash("admin123", 10);
    memoryUsers.push({
      _id: "mem_admin_01",
      id: "mem_admin_01",
      name: "Admin Manager",
      email: "admin@pizzario.com",
      password: hashedAdminPass,
      role: "admin",
    });
  } catch (err) {
    console.error("In-memory admin init error:", err.message);
  }
})();

// Helper to generate JWT token
const generateToken = (user) => {
  const userId = user._id ? user._id.toString() : user.id;
  return jwt.sign(
    {
      id: userId,
      _id: userId,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || "pizzario_super_secret_jwt_key_2026",
    {
      expiresIn: "7d",
    }
  );
};

// Customer Registration (POST /api/auth/register)
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (name, email, password).",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "An account with this email already exists.",
        });
      }

      const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: "user", // Default normal customer
      });

      const token = generateToken(user);

      return res.status(201).json({
        success: true,
        message: "Registration successful! Welcome to Pizzario 🍕",
        token,
        user: {
          id: user._id,
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (dbErr) {
      // In-memory offline fallback
      const existingMem = memoryUsers.find((u) => u.email === normalizedEmail);
      if (existingMem) {
        return res.status(400).json({
          success: false,
          message: "An account with this email already exists.",
        });
      }

      const memUser = {
        _id: "mem_" + Date.now(),
        id: "mem_" + Date.now(),
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: "user",
      };
      memoryUsers.push(memUser);

      const token = generateToken(memUser);

      return res.status(201).json({
        success: true,
        message: "Registration successful! Welcome to Pizzario 🍕",
        token,
        user: {
          id: memUser._id,
          _id: memUser._id,
          name: memUser.name,
          email: memUser.email,
          role: memUser.role,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Registration failed.",
    });
  }
};

// Customer Login (POST /api/auth/login)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide your email and password.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    let user;
    try {
      user = await User.findOne({ email: normalizedEmail });
    } catch (dbErr) {
      user = memoryUsers.find((u) => u.email === normalizedEmail);
    }

    if (!user) {
      user = memoryUsers.find((u) => u.email === normalizedEmail);
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful! Welcome back.",
      token,
      user: {
        id: user._id || user.id,
        _id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Login failed.",
    });
  }
};

// Admin Login (POST /api/admin/login)
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide admin email and password.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    let user;
    try {
      user = await User.findOne({ email: normalizedEmail });
    } catch (dbErr) {
      user = memoryUsers.find((u) => u.email === normalizedEmail);
    }

    if (!user) {
      user = memoryUsers.find((u) => u.email === normalizedEmail);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials.",
      });
    }

    // Role verification
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Administrator privileges required.",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Admin authentication successful. Welcome to Admin Console.",
      token,
      user: {
        id: user._id || user.id,
        _id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Admin login failed.",
    });
  }
};

// Forgot Password (POST /api/auth/forgot-password)
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email address.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const resetToken = crypto.randomBytes(20).toString("hex");
    const tokenExpires = Date.now() + 3600000; // 1 hour

    try {
      const user = await User.findOne({ email: normalizedEmail });
      if (user) {
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = tokenExpires;
        await user.save();
      }
    } catch (dbErr) {
      const memUser = memoryUsers.find((u) => u.email === normalizedEmail);
      if (memUser) {
        memUser.resetPasswordToken = resetToken;
        memUser.resetPasswordExpires = tokenExpires;
      }
    }

    return res.status(200).json({
      success: true,
      message: "Password reset request received. You may now reset your password.",
      resetToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reset Password (POST /api/auth/reset-password)
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, email } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
      let user;
      if (token) {
        user = await User.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() },
        });
      } else if (email) {
        user = await User.findOne({ email: email.toLowerCase().trim() });
      }

      if (user) {
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
      }
    } catch (dbErr) {
      const memUser = memoryUsers.find(
        (u) =>
          (token && u.resetPasswordToken === token) ||
          (email && u.email === email.toLowerCase().trim())
      );
      if (memUser) {
        memUser.password = hashedPassword;
        memUser.resetPasswordToken = undefined;
        memUser.resetPasswordExpires = undefined;
      }
    }

    return res.status(200).json({
      success: true,
      message: "Password reset successful! You can now log in.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get profile (GET /api/auth/me)
const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  adminLogin,
  forgotPassword,
  resetPassword,
  getMe,
  memoryUsers,
};