// filename: frontend/src/components/templates/MinimalTemplate.jsx
import React from "react";
import "./templateShared.css";
import "./MinimalTemplate.css";
import {
  renderSummary, renderExperience, renderEducation, renderProjects, renderSkills,
  renderCertificates, renderAchievements, renderLanguages, renderInterests,
  renderReferences, renderCustomSections,
} from "./sectionRenderers";

const MinimalTemplate = ({ resume }) => {
  const accent = resume.accentColor || "#0F3D2E";
  const p = resume.personalInfo || {};

  return (
    <div className="resume-page minimal-template" style={{ "--rc-accent": accent }}>
      <h1 className="minimal-name">{p.fullName || "Your Name"}</h1>
      <p className="minimal-role">{p.jobTitle}</p>
      <div className="minimal-contact">
        {[p.email, p.phone, p.location, p.website, p.linkedin, p.github].filter(Boolean).join("  /  ")}
      </div>
      <hr className="minimal-rule" style={{ borderColor: accent }} />
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

export default MinimalTemplate;
