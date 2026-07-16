// filename: backend/controllers/adminController.js
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");
const Resume = require("../models/Resume");
const Log = require("../models/Log");

// @route GET /api/admin/stats
const getStats = asyncHandler(async (req, res) => {
  const [userCount, resumeCount, adminCount] = await Promise.all([
    User.countDocuments(),
    Resume.countDocuments(),
    User.countDocuments({ role: "admin" }),
  ]);

  const templateBreakdown = await Resume.aggregate([
    { $group: { _id: "$template", count: { $sum: 1 } } },
  ]);

  res.json({
    userCount,
    resumeCount,
    adminCount,
    templateBreakdown,
  });
});

// @route GET /api/admin/users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ users });
});

// @route GET /api/admin/logs
const getLogs = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 100;
  const logs = await Log.find().populate("user", "name email").sort({ createdAt: -1 }).limit(limit);
  res.json({ logs });
});

module.exports = { getStats, getUsers, getLogs };
