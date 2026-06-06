const mongoose = require("mongoose");

// Disable query buffering globally for all models
mongoose.set("bufferCommands", false);

// Initialize cached connection object globally
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // If we already have a connection, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If there's no active connection promise, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering so we fail fast if connection drops
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4 to prevent serverless DNS resolution lags
      maxPoolSize: 5, // Avoid exhausting MongoDB connections in serverless scale
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongooseInstance) => {
      console.log(`MongoDB connected: ${mongooseInstance.connection.host}`);
      global.useMockDB = false;
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // If connection fails, clear the cached promise so we can retry on next request
    cached.promise = null;
    global.useMockDB = true;

    console.warn(`MongoDB connection failed: ${error.message}`);
    console.warn("--------------------------------------------------");
    console.warn("⚠️  WARNING: Running in-memory mock database mode!");
    console.warn("--------------------------------------------------");

    if (process.env.VERCEL) {
      throw error;
    }
  }

  return cached.conn;
};

module.exports = connectDB;
