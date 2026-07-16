// filename: backend/middleware/validateMiddleware.js
const { validationResult } = require("express-validator");

/**
 * Runs after express-validator check(...) chains on a route.
 * If any validation failed, responds with 400 and the list of errors.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

module.exports = { validate };
