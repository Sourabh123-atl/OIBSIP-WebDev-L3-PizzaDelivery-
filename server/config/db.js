const mongoose = require("mongoose");

mongoose.set("bufferCommands", false);

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/pizzario";

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Warning: ${error.message}`);
    console.warn("ℹ️ Running with in-memory / mock persistence mode if database is offline.");
    return false;
  }
};

module.exports = connectDB;