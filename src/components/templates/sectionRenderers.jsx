// filename: frontend/src/components/templates/sectionRenderers.jsx
import React from "react";

// Shared section renderers reused across all 5 templates, so each template
// component only has to define layout, not repeat this markup.

export const renderSummary = (resume) =>
  resume.personalInfo?.summary ? (
    <div className="resume-section">
      <div className="resume-section-title">Summary</div>
      <p className="resume-summary">{resume.personalInfo.summary}</p>
    </div>
  ) : null;

export const renderExperience = (resume) =>
  resume.experience?.length ? (
    <div className="resume-section">
      <div className="resume-section-title">Experience</div>
      {resume.experience.map((e, i) => (
        <div className="resume-entry" key={e._id || i}>
          <div className="resume-entry-head">
            <span>{e.role} · {e.company}</span>
            <span>{e.startDate} – {e.current ? "Present" : e.endDate}</span>
          </div>
          <div className="resume-entry-sub">{e.location}</div>
          {e.bullets?.length > 0 && (
            <ul className="resume-bullets">
              {e.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
            </ul>
          )}
        </div>
      ))}
    </div>
  ) : null;

export const renderEducation = (resume) =>
  resume.education?.length ? (
    <div className="resume-section">
      <div className="resume-section-title">Education</div>
      {resume.education.map((e, i) => (
        <div className="resume-entry" key={e._id || i}>
          <div className="resume-entry-head">
            <span>{e.degree} in {e.fieldOfStudy}</span>
            <span>{e.startDate} – {e.endDate}</span>
          </div>
          <div className="resume-entry-sub">{e.school}{e.grade ? ` · ${e.grade}` : ""}</div>
          {e.description && <p className="resume-summary">{e.description}</p>}
        </div>
      ))}
    </div>
  ) : null;

export const renderProjects = (resume) =>
  resume.projects?.length ? (
    <div className="resume-section">
      <div className="resume-section-title">Projects</div>
      {resume.projects.map((p, i) => (
        <div className="resume-entry" key={p._id || i}>
          <div className="resume-entry-head"><span>{p.title}</span></div>
          {p.techStack?.length > 0 && <div className="resume-entry-sub">{p.techStack.join(" · ")}</div>}
          {p.description && <p className="resume-summary">{p.description}</p>}
        </div>
      ))}
    </div>
  ) : null;

export const renderSkills = (resume) =>
  resume.skills?.length ? (
    <div className="resume-section">
      <div className="resume-section-title">Skills</div>
      <div className="resume-tags">
        {resume.skills.map((s, i) => <span className="resume-tag" key={i}>{s}</span>)}
      </div>
    </div>
  ) : null;

export const renderCertificates = (resume) =>
  resume.certificates?.length ? (
    <div className="resume-section">
      <div className="resume-section-title">Certificates</div>
      {resume.certificates.map((c, i) => (
        <div className="resume-entry" key={c._id || i}>
          <div className="resume-entry-head"><span>{c.name}</span><span>{c.date}</span></div>
          <div className="resume-entry-sub">{c.issuer}</div>
        </div>
      ))}
    </div>
  ) : null;

export const renderAchievements = (resume) =>
  resume.achievements?.length ? (
    <div className="resume-section">
      <div className="resume-section-title">Achievements</div>
      <ul className="resume-bullets">
        {resume.achievements.map((a, i) => <li key={i}>{a}</li>)}
      </ul>
    </div>
  ) : null;

export const renderLanguages = (resume) =>
  resume.languages?.length ? (
    <div className="resume-section">
      <div className="resume-section-title">Languages</div>
      <div className="resume-tags">
        {resume.languages.map((l, i) => <span className="resume-tag" key={i}>{l.name} · {l.proficiency}</span>)}
      </div>
    </div>
  ) : null;

export const renderInterests = (resume) =>
  resume.interests?.length ? (
    <div className="resume-section">
      <div className="resume-section-title">Interests</div>
      <div className="resume-tags">
        {resume.interests.map((int, i) => <span className="resume-tag" key={i}>{int}</span>)}
      </div>
    </div>
  ) : null;

export const renderReferences = (resume) =>
  resume.references?.length ? (
    <div className="resume-section">
      <div className="resume-section-title">References</div>
      {resume.references.map((r, i) => (
        <div className="resume-entry" key={r._id || i}>
          <div className="resume-entry-head"><span>{r.name}</span></div>
          <div className="resume-entry-sub">{r.relationship}{r.company ? ` · ${r.company}` : ""}{r.email ? ` · ${r.email}` : ""}</div>
        </div>
      ))}
    </div>
  ) : null;

export const renderCustomSections = (resume) =>
  resume.customSections?.length
    ? resume.customSections.map((c, i) => (
        <div className="resume-section" key={c._id || i}>
          <div className="resume-section-title">{c.title}</div>
          <p className="resume-summary">{c.content}</p>
        </div>
      ))
    : null;
