// filename: frontend/src/components/resume/SkillsForm.jsx
import React, { useState } from "react";
import TagListForm from "./TagListForm";
import AIButton from "../common/AIButton";
import { streamAI, aiEndpoints } from "../../services/aiService";
import { notifyError, notifySuccess } from "../../utils/toast";

const SkillsForm = ({ items = [], onChange, resume }) => {
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!resume.personalInfo?.jobTitle) {
      notifyError("Add a job title in Personal Info first.");
      return;
    }
    setGenerating(true);
    try {
      let full = "";
      await streamAI(
        aiEndpoints.skills,
        {
          jobTitle: resume.personalInfo.jobTitle,
          experienceText: (resume.experience || []).map((e) => `${e.role} at ${e.company}`).join("; "),
        },
        (chunk) => { full += chunk; }
      );
      const newSkills = full.split(",").map((s) => s.trim()).filter(Boolean);
      const merged = Array.from(new Set([...items, ...newSkills]));
      onChange(merged);
      notifySuccess("Skills generated");
    } catch (err) {
      notifyError(err.message || "Could not generate skills.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <AIButton onClick={handleGenerate} loading={generating}>Suggest skills</AIButton>
      </div>
      <TagListForm items={items} onChange={onChange} placeholder="e.g. Project Management" />
    </div>
  );
};

export default SkillsForm;
