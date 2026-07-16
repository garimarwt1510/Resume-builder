// filename: frontend/src/components/templates/ProfessionalTemplate.jsx
import React from "react";
import "./templateShared.css";
import "./ProfessionalTemplate.css";
import {
  renderSummary, renderExperience, renderEducation, renderProjects, renderSkills,
  renderCertificates, renderAchievements, renderLanguages, renderInterests,
  renderReferences, renderCustomSections,
} from "./sectionRenderers";

const ProfessionalTemplate = ({ resume }) => {
  const accent = resume.accentColor || "#0F3D2E";
  const p = resume.personalInfo || {};

  return (
    <div className="resume-page professional-template" style={{ "--rc-accent": accent }}>
      <div className="professional-header" style={{ borderColor: accent }}>
        <h1 className="resume-name">{p.fullName || "Your Name"}</h1>
        <p className="resume-job-title" style={{ color: accent }}>{p.jobTitle}</p>
        <div className="resume-contact">
          {[p.email, p.phone, p.location, p.website, p.linkedin, p.github].filter(Boolean).join("   ·   ")}
        </div>
      </div>
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

export default ProfessionalTemplate;
