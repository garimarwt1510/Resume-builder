// filename: frontend/src/components/common/AIButton.jsx
import React from "react";
import "./AIButton.css";

/**
 * A small pill button used to trigger AI actions inline within form sections
 * (e.g. "✨ Generate summary", "✨ Improve with AI").
 */
const AIButton = ({ children, onClick, loading = false, disabled = false }) => (
  <button type="button" className="ai-btn" onClick={onClick} disabled={disabled || loading}>
    <span className="ai-btn-spark" aria-hidden="true">{loading ? "⏳" : "✨"}</span>
    {children}
  </button>
);

export default AIButton;
