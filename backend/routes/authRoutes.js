// filename: backend/routes/authRoutes.js
const express = require("express");
const { body } = require("express-validator");
const { register, login, logout, getMe, updateTheme } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateMiddleware");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("A valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  validate,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("A valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  login
);

router.post("/logout", protect, logout);
router.get("/me", protect, getMe);
router.put("/theme", protect, updateTheme);

module.exports = router;
