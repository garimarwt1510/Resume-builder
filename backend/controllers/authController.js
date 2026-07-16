// filename: backend/controllers/authController.js
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { logActivity } = require("../utils/logger");

// Shape a consistent public user object (never leak password hash)
const toPublicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  theme: user.theme,
  createdAt: user.createdAt,
});

// @route POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "An account with this email already exists" });
  }

  // Auto-promote the configured admin email to the "admin" role
  const role = email.toLowerCase() === (process.env.ADMIN_EMAIL || "").toLowerCase() ? "admin" : "user";

  const user = await User.create({ name, email, password, role });
  const token = generateToken(user._id);

  await logActivity({ userId: user._id, action: "REGISTER", ip: req.ip });

  res.status(201).json({ user: toPublicUser(user), token });
});

// @route POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user._id);
  await logActivity({ userId: user._id, action: "LOGIN", ip: req.ip });

  res.json({ user: toPublicUser(user), token });
});

// @route POST /api/auth/logout
// Stateless JWT logout: the client simply discards the token. This endpoint
// exists for symmetry, consistent API design, and to log the action.
const logout = asyncHandler(async (req, res) => {
  if (req.user) {
    await logActivity({ userId: req.user._id, action: "LOGOUT", ip: req.ip });
  }
  res.json({ message: "Logged out successfully" });
});

// @route GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.json({ user: toPublicUser(req.user) });
});

// @route PUT /api/auth/theme
const updateTheme = asyncHandler(async (req, res) => {
  const { theme } = req.body;
  if (!["light", "dark"].includes(theme)) {
    return res.status(400).json({ message: "Theme must be 'light' or 'dark'" });
  }
  req.user.theme = theme;
  await req.user.save();
  res.json({ user: toPublicUser(req.user) });
});

module.exports = { register, login, logout, getMe, updateTheme };
