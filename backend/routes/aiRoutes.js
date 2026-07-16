// filename: backend/routes/aiRoutes.js
const express = require("express");
const rateLimit = require("express-rate-limit");
const {
  generateSummary,
  improveExperience,
  generateSkills,
  rewriteBullet,
  generateAchievements,
  generateCoverLetter,
  atsOptimization,
  grammarCorrection,
  toneRewrite,
  resumeReview,
} = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Basic rate limiting to protect the AI API key/budget from abuse
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { message: "Too many AI requests, please slow down." },
});

router.use(protect, aiLimiter);

router.post("/summary", generateSummary);
router.post("/improve-experience", improveExperience);
router.post("/skills", generateSkills);
router.post("/rewrite-bullet", rewriteBullet);
router.post("/achievements", generateAchievements);
router.post("/cover-letter", generateCoverLetter);
router.post("/ats-check", atsOptimization);
router.post("/grammar", grammarCorrection);
router.post("/tone", toneRewrite);
router.post("/review", resumeReview);

module.exports = router;
