// filename: backend/controllers/resumeController.js
const asyncHandler = require("../utils/asyncHandler");
const Resume = require("../models/Resume");
const { logActivity } = require("../utils/logger");

// @route GET /api/resumes  (supports ?search=keyword)
const getResumes = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const query = { user: req.user._id };

  let resumesQuery;
  if (search) {
    resumesQuery = Resume.find({ ...query, $text: { $search: search } });
  } else {
    resumesQuery = Resume.find(query);
  }

  const resumes = await resumesQuery.sort({ updatedAt: -1 });
  res.json({ resumes, count: resumes.length });
});

// @route GET /api/resumes/:id
const getResumeById = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
  if (!resume) {
    return res.status(404).json({ message: "Resume not found" });
  }
  res.json({ resume });
});

// @route POST /api/resumes
const createResume = asyncHandler(async (req, res) => {
  const resume = await Resume.create({ ...req.body, user: req.user._id });
  await logActivity({ userId: req.user._id, action: "RESUME_CREATED", details: resume._id.toString() });
  res.status(201).json({ resume });
});

// @route PUT /api/resumes/:id  (also used for auto-save)
const updateResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!resume) {
    return res.status(404).json({ message: "Resume not found" });
  }

  res.json({ resume });
});

// @route DELETE /api/resumes/:id
const deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!resume) {
    return res.status(404).json({ message: "Resume not found" });
  }
  await logActivity({ userId: req.user._id, action: "RESUME_DELETED", details: req.params.id });
  res.json({ message: "Resume deleted successfully" });
});

// @route POST /api/resumes/:id/duplicate
const duplicateResume = asyncHandler(async (req, res) => {
  const original = await Resume.findOne({ _id: req.params.id, user: req.user._id }).lean();
  if (!original) {
    return res.status(404).json({ message: "Resume not found" });
  }

  delete original._id;
  delete original.createdAt;
  delete original.updatedAt;
  original.title = `${original.title} (Copy)`;

  const duplicate = await Resume.create(original);
  res.status(201).json({ resume: duplicate });
});

module.exports = {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  duplicateResume,
};
