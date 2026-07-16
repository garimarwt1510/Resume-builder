// filename: frontend/src/components/resume/ResumePreview.jsx
import React from "react";
import ModernTemplate from "../templates/ModernTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import ATSTemplate from "../templates/ATSTemplate";

const TEMPLATE_COMPONENTS = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  ats: ATSTemplate,
};

/**
 * Picks the right template component based on resume.template and renders it.
 * This same component is used for the live in-editor preview, the full
 * preview page, and (indirectly) as the visual reference for the PDF export.
 */
const ResumePreview = ({ resume }) => {
  const TemplateComponent = TEMPLATE_COMPONENTS[resume.template] || ModernTemplate;
  return <TemplateComponent resume={resume} />;
};

export default ResumePreview;
