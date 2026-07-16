// filename: backend/models/Resume.js
const mongoose = require("mongoose");

// Sub-schemas for each resume section. Using _id: true (default) so the
// frontend can reference/edit/delete individual entries easily.

const EducationSchema = new mongoose.Schema(
  {
    school: String,
    degree: String,
    fieldOfStudy: String,
    startDate: String,
    endDate: String,
    grade: String,
    description: String,
  },
  { _id: true }
);

const ExperienceSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    location: String,
    startDate: String,
    endDate: String,
    current: { type: Boolean, default: false },
    bullets: [String], // achievement/responsibility bullet points
  },
  { _id: true }
);

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    link: String,
    techStack: [String],
    description: String,
    bullets: [String],
  },
  { _id: true }
);

const CertificateSchema = new mongoose.Schema(
  {
    name: String,
    issuer: String,
    date: String,
    link: String,
  },
  { _id: true }
);

const LanguageSchema = new mongoose.Schema(
  {
    name: String,
    proficiency: {
      type: String,
      enum: ["Basic", "Conversational", "Fluent", "Native"],
      default: "Conversational",
    },
  },
  { _id: true }
);

const ReferenceSchema = new mongoose.Schema(
  {
    name: String,
    relationship: String,
    company: String,
    email: String,
    phone: String,
  },
  { _id: true }
);

const CustomSectionSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  { _id: true }
);

const ResumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "Untitled Resume",
      trim: true,
    },
    template: {
      type: String,
      enum: ["modern", "professional", "minimal", "creative", "ats"],
      default: "modern",
    },
    accentColor: { type: String, default: "#6C5CE7" },

    personalInfo: {
      fullName: String,
      jobTitle: String,
      email: String,
      phone: String,
      location: String,
      website: String,
      linkedin: String,
      github: String,
      summary: String,
      photoUrl: String,
    },

    education: [EducationSchema],
    experience: [ExperienceSchema],
    projects: [ProjectSchema],
    skills: [String],
    certificates: [CertificateSchema],
    achievements: [String],
    languages: [LanguageSchema],
    interests: [String],
    references: [ReferenceSchema],
    customSections: [CustomSectionSchema],

    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Text index to support the dashboard search feature
ResumeSchema.index({ title: "text", "personalInfo.fullName": "text", "personalInfo.jobTitle": "text" });

module.exports = mongoose.model("Resume", ResumeSchema);
