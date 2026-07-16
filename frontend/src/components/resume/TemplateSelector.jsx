// filename: frontend/src/components/resume/TemplateSelector.jsx
import React from "react";
import { TEMPLATES, ACCENT_COLORS } from "../../utils/constants";
import "./TemplateSelector.css";

const TemplateSelector = ({ template, accentColor, onTemplateChange, onColorChange }) => (
  <div className="template-selector">
    <h4>Template</h4>
    <div className="template-grid">
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`template-option ${template === t.id ? "selected" : ""}`}
          onClick={() => onTemplateChange(t.id)}
        >
          <span className="template-option-name">{t.name}</span>
          <span className="template-option-desc">{t.description}</span>
        </button>
      ))}
    </div>

    <h4 style={{ marginTop: 16 }}>Accent color</h4>
    <div className="color-grid">
      {ACCENT_COLORS.map((c) => (
        <button
          key={c}
          type="button"
          className={`color-swatch ${accentColor === c ? "selected" : ""}`}
          style={{ background: c }}
          onClick={() => onColorChange(c)}
          aria-label={`Select accent color ${c}`}
        />
      ))}
    </div>
  </div>
);

export default TemplateSelector;
