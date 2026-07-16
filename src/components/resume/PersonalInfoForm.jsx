// filename: frontend/src/components/resume/PersonalInfoForm.jsx
import React, { useState } from "react";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import AIButton from "../common/AIButton";
import { streamAI, aiEndpoints } from "../../services/aiService";
import { notifyError } from "../../utils/toast";
import "./SectionAccordion.css";

/**
 * Personal info + AI-generated professional summary. Streams the summary
 * token-by-token into the textarea as the AI responds.
 */
const PersonalInfoForm = ({ data, onChange, resume }) => {
  const [generating, setGenerating] = useState(false);

  const update = (field, value) => onChange({ ...data, [field]: value });

  const handleGenerateSummary = async () => {
    if (!data.jobTitle) {
      notifyError("Add a job title first so the AI knows what to write about.");
      return;
    }
    setGenerating(true);
    update("summary", ""); // clear so streamed text is visible as it arrives
    try {
      let accumulated = "";
      await streamAI(
        aiEndpoints.summary,
        {
          jobTitle: data.jobTitle,
          experienceText: (resume.experience || []).map((e) => `${e.role} at ${e.company}`).join("; "),
          skills: resume.skills,
        },
        (chunk) => {
          accumulated += chunk;
          update("summary", accumulated);
        }
      );
    } catch (err) {
      notifyError(err.message || "Could not generate summary.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <div className="repeatable-item-row">
        <Input label="Full name" value={data.fullName} onChange={(e) => update("fullName", e.target.value)} />
        <Input label="Job title" value={data.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} />
        <Input label="Email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} />
        <Input label="Phone" value={data.phone} onChange={(e) => update("phone", e.target.value)} />
        <Input label="Location" value={data.location} onChange={(e) => update("location", e.target.value)} />
        <Input label="Website" value={data.website} onChange={(e) => update("website", e.target.value)} />
        <Input label="LinkedIn" value={data.linkedin} onChange={(e) => update("linkedin", e.target.value)} />
        <Input label="GitHub" value={data.github} onChange={(e) => update("github", e.target.value)} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-ink-soft)" }}>
          Professional summary
        </label>
        <AIButton onClick={handleGenerateSummary} loading={generating}>Generate summary</AIButton>
      </div>
      <TextArea
        rows={4}
        value={data.summary}
        onChange={(e) => update("summary", e.target.value)}
        placeholder="A 3-4 sentence pitch of who you are professionally…"
      />
    </div>
  );
};

export default PersonalInfoForm;
