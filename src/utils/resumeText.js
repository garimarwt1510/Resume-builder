// filename: frontend/src/utils/resumeText.js

/**
 * Flattens a resume object into a single plain-text block, used as input
 * for AI features like ATS optimization, grammar checks, and resume review.
 */
export const resumeToPlainText = (resume) => {
  if (!resume) return "";
  const p = resume.personalInfo || {};
  const lines = [];

  lines.push(`${p.fullName || ""} — ${p.jobTitle || ""}`);
  lines.push(p.summary || "");

  if (resume.experience?.length) {
    lines.push("EXPERIENCE");
    resume.experience.forEach((e) => {
      lines.push(`${e.role} at ${e.company} (${e.startDate} - ${e.current ? "Present" : e.endDate})`);
      (e.bullets || []).forEach((b) => lines.push(`- ${b}`));
    });
  }

  if (resume.education?.length) {
    lines.push("EDUCATION");
    resume.education.forEach((e) => {
      lines.push(`${e.degree} in ${e.fieldOfStudy}, ${e.school} (${e.startDate} - ${e.endDate})`);
    });
  }

  if (resume.projects?.length) {
    lines.push("PROJECTS");
    resume.projects.forEach((pr) => {
      lines.push(`${pr.title}: ${pr.description || ""}`);
    });
  }

  if (resume.skills?.length) {
    lines.push(`SKILLS: ${resume.skills.join(", ")}`);
  }

  if (resume.achievements?.length) {
    lines.push("ACHIEVEMENTS");
    resume.achievements.forEach((a) => lines.push(`- ${a}`));
  }

  return lines.filter(Boolean).join("\n");
};
