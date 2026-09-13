const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");
const User = require("./models/User");
const bcrypt = require("bcrypt");

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and seed admin if needed
connectDB().then(async (connected) => {
  if (connected) {
    try {
      const adminExists = await User.findOne({ email: "admin@pizzario.com" });
      if (!adminExists) {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await User.create({
          name: "Admin Manager",
          email: "admin@pizzario.com",
          password: hashedPassword,
          role: "admin",
        });
        console.log("👑 Default admin account seeded: admin@pizzario.com (Password: admin123)");
      }
    } catch (err) {
      console.warn("Notice during admin check:", err.message);
    }
  }
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
});