// filename: frontend/src/pages/ResumeEditor.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as resumeService from "../services/resumeService";
import { useAutoSave } from "../hooks/useAutoSave";
import { notifyError, notifySuccess } from "../utils/toast";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import SectionAccordion from "../components/resume/SectionAccordion";
import PersonalInfoForm from "../components/resume/PersonalInfoForm";
import EducationForm from "../components/resume/EducationForm";
import ExperienceForm from "../components/resume/ExperienceForm";
import ProjectsForm from "../components/resume/ProjectsForm";
import SkillsForm from "../components/resume/SkillsForm";
import CertificatesForm from "../components/resume/CertificatesForm";
import AchievementsForm from "../components/resume/AchievementsForm";
import LanguagesForm from "../components/resume/LanguagesForm";
import InterestsForm from "../components/resume/InterestsForm";
import ReferencesForm from "../components/resume/ReferencesForm";
import CustomSectionForm from "../components/resume/CustomSectionForm";
import TemplateSelector from "../components/resume/TemplateSelector";
import ResumePreview from "../components/resume/ResumePreview";
import AIAssistantPanel from "../components/resume/AIAssistantPanel";
import "./ResumeEditor.css";

const ResumeEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { resume } = await resumeService.getResumeById(id);
        if (mounted) setResume(resume);
      } catch {
        notifyError("Could not load this resume.");
        navigate("/dashboard");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id, navigate]);

  const saveResume = useCallback(
    async (data) => {
      await resumeService.updateResume(id, data);
    },
    [id]
  );

  const autoSaveStatus = useAutoSave(resume, saveResume);

  const updateField = (field, value) => setResume((prev) => ({ ...prev, [field]: value }));
  const updatePersonalInfo = (personalInfo) => setResume((prev) => ({ ...prev, personalInfo }));

  if (loading || !resume) return <Loader fullScreen message="Loading resume…" />;

  const statusLabel = {
    idle: "",
    saving: "Saving…",
    saved: "All changes saved",
    error: "Could not save — check your connection",
  }[autoSaveStatus];

  return (
    <div className="container editor-page">
      <div className="editor-topbar">
        <Input
          value={resume.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="editor-title-input"
          aria-label="Resume title"
        />
        <div className="editor-topbar-right">
          <span className={`editor-save-status status-${autoSaveStatus}`}>{statusLabel}</span>
          <Link to={`/resume/${id}/preview`}>
            <Button variant="secondary">Preview & Download</Button>
          </Link>
        </div>
      </div>

      <div className="editor-layout">
        <div className="editor-forms">
          <SectionAccordion title="Personal Information" subtitle="Contact details and summary" defaultOpen>
            <PersonalInfoForm data={resume.personalInfo} onChange={updatePersonalInfo} resume={resume} />
          </SectionAccordion>

          <SectionAccordion title="Experience" subtitle="Your work history">
            <ExperienceForm items={resume.experience} onChange={(v) => updateField("experience", v)} />
          </SectionAccordion>

          <SectionAccordion title="Education">
            <EducationForm items={resume.education} onChange={(v) => updateField("education", v)} />
          </SectionAccordion>

          <SectionAccordion title="Projects">
            <ProjectsForm items={resume.projects} onChange={(v) => updateField("projects", v)} />
          </SectionAccordion>

          <SectionAccordion title="Skills">
            <SkillsForm items={resume.skills} onChange={(v) => updateField("skills", v)} resume={resume} />
          </SectionAccordion>

          <SectionAccordion title="Certificates">
            <CertificatesForm items={resume.certificates} onChange={(v) => updateField("certificates", v)} />
          </SectionAccordion>

          <SectionAccordion title="Achievements">
            <AchievementsForm items={resume.achievements} onChange={(v) => updateField("achievements", v)} resume={resume} />
          </SectionAccordion>

          <SectionAccordion title="Languages">
            <LanguagesForm items={resume.languages} onChange={(v) => updateField("languages", v)} />
          </SectionAccordion>

          <SectionAccordion title="Interests">
            <InterestsForm items={resume.interests} onChange={(v) => updateField("interests", v)} />
          </SectionAccordion>

          <SectionAccordion title="References">
            <ReferencesForm items={resume.references} onChange={(v) => updateField("references", v)} />
          </SectionAccordion>

          <SectionAccordion title="Custom Sections">
            <CustomSectionForm items={resume.customSections} onChange={(v) => updateField("customSections", v)} />
          </SectionAccordion>

          <SectionAccordion title="Template & Design" defaultOpen>
            <TemplateSelector
              template={resume.template}
              accentColor={resume.accentColor}
              onTemplateChange={(v) => updateField("template", v)}
              onColorChange={(v) => updateField("accentColor", v)}
            />
          </SectionAccordion>
        </div>

        <div className="editor-side">
          <div className="editor-preview-shell">
            <div className="editor-preview-scale">
              <ResumePreview resume={resume} />
            </div>
          </div>
          <AIAssistantPanel resume={resume} />
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
