// filename: frontend/src/components/resume/AchievementsForm.jsx
import React, { useState } from "react";
import TagListForm from "./TagListForm";
import AIButton from "../common/AIButton";
import { streamAI, aiEndpoints } from "../../services/aiService";
import { notifyError, notifySuccess } from "../../utils/toast";

const AchievementsForm = ({ items = [], onChange, resume }) => {
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
        aiEndpoints.achievements,
        {
          jobTitle: resume.personalInfo.jobTitle,
          experienceText: (resume.experience || []).map((e) => `${e.role} at ${e.company}`).join("; "),
        },
        (chunk) => { full += chunk; }
      );
      const suggestions = full.split("\n").map((l) => l.replace(/^[-•\d.\s]+/, "").trim()).filter(Boolean);
      onChange([...items, ...suggestions]);
      notifySuccess("Achievements generated");
    } catch (err) {
      notifyError(err.message || "Could not generate achievements.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <AIButton onClick={handleGenerate} loading={generating}>Suggest achievements</AIButton>
      </div>
      <TagListForm items={items} onChange={onChange} placeholder="e.g. Increased revenue by 20%" />
    </div>
  );
};

export default AchievementsForm;
