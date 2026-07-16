// filename: backend/routes/adminRoutes.js
const express = require("express");
const { getStats, getUsers, getLogs } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.use(protect, adminOnly);

router.get("/stats", getStats);
router.get("/users", getUsers);
router.get("/logs", getLogs);

module.exports = router;
