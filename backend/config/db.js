const mongoose = require("mongoose");

const connectDB = async () => {
  // If already connected or connecting, skip
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
    global.useMockDB = false;
    return connection;
  } catch (error) {
    console.warn(`MongoDB connection failed: ${error.message}`);
    console.warn("--------------------------------------------------");
    console.warn("⚠️  WARNING: Running in-memory mock database mode!");
    console.warn("--------------------------------------------------");
    global.useMockDB = true;
    if (process.env.VERCEL) {
      throw error;
    }
  }
};

module.exports = connectDB;
