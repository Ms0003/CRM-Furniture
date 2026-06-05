const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
    global.useMockDB = false;
  } catch (error) {
    console.warn(`MongoDB connection failed: ${error.message}`);
    console.warn("--------------------------------------------------");
    console.warn("⚠️  WARNING: Running in-memory mock database mode!");
    console.warn("--------------------------------------------------");
    global.useMockDB = true;
  }
};

module.exports = connectDB;
