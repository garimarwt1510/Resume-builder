// filename: backend/utils/asyncHandler.js

/**
 * Wraps an async Express route handler so thrown errors are forwarded
 * to the centralized error-handling middleware instead of crashing the process.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
