// filename: frontend/src/components/resume/SectionAccordion.jsx
import React, { useState } from "react";
import "./SectionAccordion.css";

/**
 * Collapsible wrapper used for every resume section in the editor, so the
 * form doesn't turn into one long unmanageable scroll.
 */
const SectionAccordion = ({ title, subtitle, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="section-accordion">
      <button
        type="button"
        className="section-accordion-header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <span className={`section-accordion-chevron ${open ? "open" : ""}`} aria-hidden="true">⌄</span>
      </button>
      {open && <div className="section-accordion-body">{children}</div>}
    </div>
  );
};

export default SectionAccordion;
