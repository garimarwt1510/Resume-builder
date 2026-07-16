// filename: frontend/src/components/dashboard/ResumeCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import "./ResumeCard.css";

const ResumeCard = ({ resume, onDelete, onDuplicate }) => {
  const navigate = useNavigate();
  const updated = new Date(resume.updatedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card hoverable className="resume-card">
      <div className="resume-card-thumb" style={{ borderTopColor: resume.accentColor || "#0F3D2E" }}>
        <span className="resume-card-template">{resume.template}</span>
      </div>
      <div className="resume-card-body">
        <h3 onClick={() => navigate(`/resume/${resume._id}`)}>{resume.title}</h3>
        <p className="resume-card-meta">{resume.personalInfo?.jobTitle || "No title yet"} · Updated {updated}</p>
        <div className="resume-card-actions">
          <button onClick={() => navigate(`/resume/${resume._id}`)}>Edit</button>
          <button onClick={() => navigate(`/resume/${resume._id}/preview`)}>Preview</button>
          <button onClick={() => onDuplicate(resume._id)}>Duplicate</button>
          <button className="resume-card-danger" onClick={() => onDelete(resume._id)}>Delete</button>
        </div>
      </div>
    </Card>
  );
};

export default ResumeCard;
