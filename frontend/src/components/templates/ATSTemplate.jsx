// filename: frontend/src/components/templates/ATSTemplate.jsx
import React from "react";
import "./templateShared.css";
import "./ATSTemplate.css";
import {
  renderSummary, renderExperience, renderEducation, renderProjects, renderSkills,
  renderCertificates, renderAchievements, renderLanguages, renderInterests,
  renderReferences, renderCustomSections,
} from "./sectionRenderers";

/**
 * Deliberately plain: no columns, no colored blocks, no icons — just
 * linear text in a predictable order so Applicant Tracking Systems can
 * parse every field reliably.
 */
const ATSTemplate = ({ resume }) => {
  const p = resume.personalInfo || {};

  return (
    <div className="resume-page ats-template">
      <h1 className="ats-name">{p.fullName || "Your Name"}</h1>
      <p className="ats-role">{p.jobTitle}</p>
      <p className="ats-contact">
        {[p.email, p.phone, p.location, p.website, p.linkedin, p.github].filter(Boolean).join(" | ")}
      </p>
      {renderSummary(resume)}
      {renderExperience(resume)}
      {renderEducation(resume)}
      {renderProjects(resume)}
      {renderSkills(resume)}
      {renderCertificates(resume)}
      {renderAchievements(resume)}
      {renderLanguages(resume)}
      {renderInterests(resume)}
      {renderReferences(resume)}
      {renderCustomSections(resume)}
    </div>
  );
};

export default ATSTemplate;
