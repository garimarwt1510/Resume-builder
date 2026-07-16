// filename: backend/routes/resumeRoutes.js
const express = require("express");
const {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  duplicateResume,
} = require("../controllers/resumeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All resume routes require authentication
router.use(protect);

router.route("/").get(getResumes).post(createResume);
router.route("/:id").get(getResumeById).put(updateResume).delete(deleteResume);
router.post("/:id/duplicate", duplicateResume);

module.exports = router;
