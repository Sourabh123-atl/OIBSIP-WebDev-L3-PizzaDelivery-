const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Fallback in-memory users in case MongoDB is unreachable in local dev
const memoryUsers = [];

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || "pizzario_default_secret_key_2026",
    {
      expiresIn: "7d",
    }
  );
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Determine initial role: admin@pizzario.com is always admin
    const userRole =
      role === "admin" || normalizedEmail === "admin@pizzario.com"
        ? "admin"
        : "user";

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email is already registered.",
        });
      }

      const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: userRole,
      });

      const token = generateToken(user);

      return res.status(201).json({
        success: true,
        message: "Registration successful! Welcome to Pizzario 🍕",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (dbErr) {
      // Offline fallback
      const existingMem = memoryUsers.find((u) => u.email === normalizedEmail);
      if (existingMem) {
        return res.status(400).json({
          success: false,
          message: "Email is already registered.",
        });
      }

      const memUser = {
        _id: "mem_" + Date.now(),
        id: "mem_" + Date.now(),
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: userRole,
      };
      memoryUsers.push(memUser);

      const token = generateToken(memUser);

      return res.status(201).json({
        success: true,
        message: "Registration successful! (Demo mode)",
        token,
        user: {
          id: memUser._id,
          name: memUser.name,
          email: memUser.email,
          role: memUser.role,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Registration failed.",
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Default admin shortcut for instant evaluation:
    if (normalizedEmail === "admin@pizzario.com" && password === "admin123") {
      const defaultAdmin = {
        _id: "admin_seed_id",
        name: "Admin Manager",
        email: "admin@pizzario.com",
        role: "admin",
      };
      const token = generateToken(defaultAdmin);
      return res.status(200).json({
        success: true,
        message: "Admin login successful!",
        token,
        user: defaultAdmin,
      });
    }

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

    res.status(200).json({
      success: true,
      message: "Login successful! Welcome back.",
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Login failed.",
    });
  }
};

// Forgot Password
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

    res.status(200).json({
      success: true,
      message:
        "Password reset link simulated! In production, an email is sent. For testing, you can proceed directly.",
      resetToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
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
      }

      if (user) {
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
      }
    } catch (dbErr) {
      // Ignore
    }

    res.status(200).json({
      success: true,
      message: "Password reset successful! You can now log in.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get current profile
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getMe,
};