// filename: frontend/src/utils/constants.js

export const TEMPLATES = [
  { id: "modern", name: "Modern", description: "Bold headers with a color accent sidebar." },
  { id: "professional", name: "Professional", description: "Traditional, corporate-friendly layout." },
  { id: "minimal", name: "Minimal", description: "Clean whitespace-first single column." },
  { id: "creative", name: "Creative", description: "Distinctive layout for design/creative roles." },
  { id: "ats", name: "ATS Friendly", description: "Plain single-column, optimized for parsers." },
];

export const TONES = ["professional", "friendly", "executive"];

export const ACCENT_COLORS = ["#0F3D2E", "#2C5F8A", "#C9932E", "#B3402A", "#5B4B8A", "#1B1B2F"];

export const EMPTY_RESUME = {
  title: "Untitled Resume",
  template: "modern",
  accentColor: "#0F3D2E",
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    photoUrl: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certificates: [],
  achievements: [],
  languages: [],
  interests: [],
  references: [],
  customSections: [],
};
