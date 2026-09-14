/**
 * CLI Script to securely create or promote an Admin account
 * Usage: node server/scripts/createAdmin.js <email> <password> <name>
 * Example: node server/scripts/createAdmin.js admin@pizzario.com SuperSecurePass123 "Admin Manager"
 */

const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const createAdmin = async () => {
  const args = process.argv.slice(2);
  const email = (args[0] || process.env.ADMIN_EMAIL || "admin@pizzario.com").toLowerCase().trim();
  const password = args[1] || process.env.ADMIN_PASSWORD || "admin123";
  const name = args[2] || "Admin Manager";

  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/pizzario";

  console.log(`Connecting to database...`);
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`Connected to MongoDB.`);

    const existing = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existing) {
      existing.role = "admin";
      existing.password = hashedPassword;
      if (name) existing.name = name;
      await existing.save();
      console.log(`✅ User "${email}" updated to ADMIN role successfully.`);
    } else {
      const newAdmin = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "admin",
      });
      console.log(`✅ Admin account "${newAdmin.email}" created successfully.`);
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to create admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
