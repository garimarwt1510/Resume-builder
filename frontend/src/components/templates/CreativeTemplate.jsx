// filename: frontend/src/components/templates/CreativeTemplate.jsx
import React from "react";
import "./templateShared.css";
import "./CreativeTemplate.css";
import {
  renderExperience, renderEducation, renderProjects,
  renderCertificates, renderAchievements, renderReferences, renderCustomSections,
} from "./sectionRenderers";

const CreativeTemplate = ({ resume }) => {
  const accent = resume.accentColor || "#0F3D2E";
  const p = resume.personalInfo || {};

  return (
    <div className="resume-page creative-template" style={{ "--rc-accent": accent }}>
      <div className="creative-hero" style={{ background: accent }}>
        <div className="creative-avatar">{(p.fullName || "?").charAt(0)}</div>
        <div>
          <h1>{p.fullName || "Your Name"}</h1>
          <p>{p.jobTitle}</p>
        </div>
      </div>

      <div className="creative-body">
        <div className="creative-col-main">
          {p.summary && <p className="resume-summary creative-summary">{p.summary}</p>}
          {renderExperience(resume)}
          {renderProjects(resume)}
          {renderCustomSections(resume)}
        </div>
        <div className="creative-col-side">
          <div className="resume-section">
            <div className="resume-section-title">Contact</div>
            <div className="resume-contact" style={{ flexDirection: "column" }}>
              {p.email && <div>{p.email}</div>}
              {p.phone && <div>{p.phone}</div>}
              {p.location && <div>{p.location}</div>}
              {p.website && <div>{p.website}</div>}
            </div>
          </div>
          {resume.skills?.length > 0 && (
            <div className="resume-section">
              <div className="resume-section-title">Skills</div>
              <div className="resume-tags">{resume.skills.map((s, i) => <span className="resume-tag" key={i}>{s}</span>)}</div>
            </div>
          )}
          {renderEducation(resume)}
          {renderCertificates(resume)}
          {renderAchievements(resume)}
          {renderReferences(resume)}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
