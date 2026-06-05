const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (global.useMockDB) {
      const emailLower = email.toLowerCase();
      // Allow both ChangeMe123! and adminpassword123 for simplicity
      if (emailLower === "admin@furniture.com" && (password === "ChangeMe123!" || password === "adminpassword123")) {
        return res.json({
          token: "mock-jwt-token-12345",
          user: {
            id: "mock-admin-id",
            name: "Furniture Admin",
            email: "admin@furniture.com",
          },
        });
      }
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.json({
      token: createToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (global.useMockDB) {
      return res.status(201).json({
        token: "mock-jwt-token-12345",
        user: {
          id: "mock-client-id-" + Date.now(),
          name,
          email,
        },
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const user = await User.create({ name, email, password });
    return res.status(201).json({
      token: createToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { login, register };
