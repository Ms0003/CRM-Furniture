require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");

const seedAdmin = async () => {
  await connectDB();

  const name = process.env.ADMIN_NAME || "Furniture Admin";
  const email = (process.env.ADMIN_EMAIL || "admin@furniture.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";

  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    console.log(`Admin already exists: ${email}. Updating name and password...`);
    existingAdmin.name = name;
    existingAdmin.password = password;
    await existingAdmin.save();
    console.log(`Admin credentials updated successfully!`);
    await mongoose.disconnect();
    return;
  }

  await User.create({ name, email, password });
  console.log(`Admin created: ${email}`);
  await mongoose.disconnect();
};

seedAdmin().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
