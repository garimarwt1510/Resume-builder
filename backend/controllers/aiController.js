// filename: backend/controllers/aiController.js
const asyncHandler = require("../utils/asyncHandler");
const { streamCompletion } = require("../services/aiService");
const prompts = require("../utils/promptTemplates");
const { logActivity } = require("../utils/logger");

/**
 * Generic streaming responder: sets SSE-style headers, streams chunks from
 * the AI provider as they arrive, then closes the connection.
 * The frontend reads this via fetch + ReadableStream (see aiService.js on the client).
 */
const streamResponse = async (req, res, prompt, logAction) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Transfer-Encoding", "chunked");

  try {
    for await (const chunk of streamCompletion(prompt)) {
      res.write(chunk);
    }
    if (logAction) {
      await logActivity({ userId: req.user._id, action: logAction, ip: req.ip });
    }
    res.end();
  } catch (error) {
    // If headers already sent, we can only end the stream with an error note.
    if (!res.headersSent) {
      res.status(500);
    }
    res.write(`\n[AI_ERROR] ${error.message}`);
    res.end();
  }
};

// @route POST /api/ai/summary
const generateSummary = asyncHandler(async (req, res) => {
  const { jobTitle, experienceText, skills } = req.body;
  const prompt = prompts.summary({ jobTitle, experienceText, skills });
  await streamResponse(req, res, prompt, "AI_SUMMARY_GENERATED");
});

// @route POST /api/ai/improve-experience
const improveExperience = asyncHandler(async (req, res) => {
  const { role, company, bullets } = req.body;
  const prompt = prompts.improveExperience({ role, company, bullets });
  await streamResponse(req, res, prompt, "AI_EXPERIENCE_IMPROVED");
});

// @route POST /api/ai/skills
const generateSkills = asyncHandler(async (req, res) => {
  const { jobTitle, experienceText } = req.body;
  const prompt = prompts.generateSkills({ jobTitle, experienceText });
  await streamResponse(req, res, prompt, "AI_SKILLS_GENERATED");
});

// @route POST /api/ai/rewrite-bullet
const rewriteBullet = asyncHandler(async (req, res) => {
  const { bullet, tone } = req.body;
  const prompt = prompts.rewriteBullet({ bullet, tone });
  await streamResponse(req, res, prompt, "AI_BULLET_REWRITTEN");
});

// @route POST /api/ai/achievements
const generateAchievements = asyncHandler(async (req, res) => {
  const { jobTitle, experienceText } = req.body;
  const prompt = prompts.generateAchievements({ jobTitle, experienceText });
  await streamResponse(req, res, prompt, "AI_ACHIEVEMENTS_GENERATED");
});

// @route POST /api/ai/cover-letter
const generateCoverLetter = asyncHandler(async (req, res) => {
  const { jobTitle, company, resumeSummary, tone } = req.body;
  const prompt = prompts.coverLetter({ jobTitle, company, resumeSummary, tone });
  await streamResponse(req, res, prompt, "AI_COVER_LETTER_GENERATED");
});

// @route POST /api/ai/ats-check
const atsOptimization = asyncHandler(async (req, res) => {
  const { resumeText, jobDescription } = req.body;
  const prompt = prompts.atsOptimization({ resumeText, jobDescription });
  await streamResponse(req, res, prompt, "AI_ATS_CHECK");
});

// @route POST /api/ai/grammar
const grammarCorrection = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const prompt = prompts.grammarCorrection({ text });
  await streamResponse(req, res, prompt, "AI_GRAMMAR_CHECK");
});

// @route POST /api/ai/tone
const toneRewrite = asyncHandler(async (req, res) => {
  const { text, tone } = req.body; // tone: "professional" | "friendly" | "executive"
  const prompt = prompts.toneRewrite({ text, tone });
  await streamResponse(req, res, prompt, "AI_TONE_REWRITE");
});

// @route POST /api/ai/review
const resumeReview = asyncHandler(async (req, res) => {
  const { resumeText } = req.body;
  const prompt = prompts.resumeReview({ resumeText });
  await streamResponse(req, res, prompt, "AI_RESUME_REVIEW");
});

module.exports = {
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
};
