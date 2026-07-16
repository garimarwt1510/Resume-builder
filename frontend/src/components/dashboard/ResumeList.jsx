// filename: frontend/src/components/dashboard/ResumeList.jsx
import React from "react";
import ResumeCard from "./ResumeCard";
import "./ResumeList.css";

const ResumeList = ({ resumes, onDelete, onDuplicate }) => (
  <div className="resume-list-grid">
    {resumes.map((resume) => (
      <ResumeCard key={resume._id} resume={resume} onDelete={onDelete} onDuplicate={onDuplicate} />
    ))}
  </div>
);

export default ResumeList;
