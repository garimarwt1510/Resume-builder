// filename: backend/utils/promptTemplates.js

// Centralized prompt builders for every AI feature. Keeping them here makes
// it easy to tune wording without touching controller logic.

const prompts = {
  summary: ({ jobTitle, experienceText, skills }) => `
Write a compelling 3-4 sentence professional resume summary for a "${jobTitle}".
Relevant skills: ${skills?.join(", ") || "N/A"}.
Background context: ${experienceText || "N/A"}.
Return only the summary text, no headers or quotation marks.`,

  improveExperience: ({ role, company, bullets }) => `
Rewrite the following resume bullet points for the role "${role}" at "${company}" to be more
impactful. Use strong action verbs, quantify results where plausible, and keep each bullet
under 20 words. Return only the improved bullet points, one per line, no numbering.

Original bullets:
${(bullets || []).map((b) => `- ${b}`).join("\n")}`,

  generateSkills: ({ jobTitle, experienceText }) => `
Based on the job title "${jobTitle}" and this experience summary: "${experienceText || ""}",
list 12-15 relevant hard and soft skills for a resume. Return as a comma-separated list only.`,

  rewriteBullet: ({ bullet, tone }) => `
Rewrite this single resume bullet point in a ${tone || "professional"} tone, keeping it under
20 words and starting with a strong action verb. Return only the rewritten bullet.

Original: "${bullet}"`,

  generateAchievements: ({ jobTitle, experienceText }) => `
Suggest 5 realistic, quantifiable professional achievements for someone working as a
"${jobTitle}". Context: ${experienceText || "N/A"}. Return one achievement per line, no numbering.`,

  coverLetter: ({ jobTitle, company, resumeSummary, tone }) => `
Write a concise, ${tone || "professional"} cover letter (250-350 words) for a "${jobTitle}"
position at "${company || "the company"}". Base it on this candidate background:
${resumeSummary || "N/A"}.
Format as plain paragraphs, no placeholders like [Your Name] left unfilled if info is available.`,

  atsOptimization: ({ resumeText, jobDescription }) => `
Act as an ATS (Applicant Tracking System) resume scanner. Compare this resume content:
"""${resumeText}"""
against this job description:
"""${jobDescription || "General best practices, no specific job description provided."}"""
Provide:
1. An estimated ATS match score out of 100
2. A short bullet list of missing keywords
3. A short bullet list of concrete improvement suggestions
Keep the whole response under 200 words.`,

  grammarCorrection: ({ text }) => `
Correct any grammar, spelling, and punctuation errors in the following resume text.
Preserve the original meaning and formatting/line breaks. Return only the corrected text.

Text:
"""${text}"""`,

  toneRewrite: ({ text, tone }) => `
Rewrite the following resume text in a ${tone} tone while preserving all factual content and
line breaks. Return only the rewritten text.

Text:
"""${text}"""`,

  resumeReview: ({ resumeText }) => `
Act as a professional resume reviewer. Review this resume content:
"""${resumeText}"""
Provide a structured critique with these sections: Strengths, Weaknesses, and 3-5 Actionable
Suggestions. Keep it under 250 words total.`,
};

module.exports = prompts;
