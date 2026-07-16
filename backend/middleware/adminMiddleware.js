// filename: backend/middleware/adminMiddleware.js

/**
 * Restricts a route to users with role "admin". Must run after `protect`.
 */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied: admin privileges required" });
};

module.exports = { adminOnly };
