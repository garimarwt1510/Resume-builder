// filename: frontend/src/components/templates/ModernTemplate.jsx
import React from "react";
import "./templateShared.css";
import "./ModernTemplate.css";
import {
  renderSummary, renderExperience, renderEducation, renderProjects, renderSkills,
  renderCertificates, renderAchievements, renderLanguages, renderInterests,
  renderReferences, renderCustomSections,
} from "./sectionRenderers";

const ModernTemplate = ({ resume }) => {
  const accent = resume.accentColor || "#0F3D2E";
  const p = resume.personalInfo || {};

  return (
    <div className="resume-page modern-template" style={{ "--rc-accent": accent }}>
      <div className="modern-sidebar" style={{ background: accent }}>
        <h1 className="modern-name">{p.fullName || "Your Name"}</h1>
        <p className="modern-role">{p.jobTitle}</p>
        <div className="modern-contact">
          {p.email && <div>{p.email}</div>}
          {p.phone && <div>{p.phone}</div>}
          {p.location && <div>{p.location}</div>}
          {p.website && <div>{p.website}</div>}
          {p.linkedin && <div>{p.linkedin}</div>}
          {p.github && <div>{p.github}</div>}
        </div>
        {resume.skills?.length > 0 && (
          <div className="modern-sidebar-section">
            <h4>Skills</h4>
            <ul>{resume.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        )}
        {resume.languages?.length > 0 && (
          <div className="modern-sidebar-section">
            <h4>Languages</h4>
            <ul>{resume.languages.map((l, i) => <li key={i}>{l.name} — {l.proficiency}</li>)}</ul>
          </div>
        )}
        {resume.interests?.length > 0 && (
          <div className="modern-sidebar-section">
            <h4>Interests</h4>
            <ul>{resume.interests.map((it, i) => <li key={i}>{it}</li>)}</ul>
          </div>
        )}
      </div>
      <div className="modern-main">
        {renderSummary(resume)}
        {renderExperience(resume)}
        {renderProjects(resume)}
        {renderEducation(resume)}
        {renderCertificates(resume)}
        {renderAchievements(resume)}
        {renderReferences(resume)}
        {renderCustomSections(resume)}
      </div>
    </div>
  );
};

export default ModernTemplate;
