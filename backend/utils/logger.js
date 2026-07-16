// filename: backend/utils/logger.js
const Log = require("../models/Log");

/**
 * Persists an activity log entry. Failures are swallowed (logged to console)
 * so logging never breaks the main request flow.
 */
const logActivity = async ({ userId, action, details = "", ip = "" }) => {
  try {
    await Log.create({ user: userId, action, details, ip });
  } catch (err) {
    console.error("Failed to write activity log:", err.message);
  }
};

module.exports = { logActivity };
