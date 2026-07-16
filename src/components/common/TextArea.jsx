// filename: frontend/src/components/common/TextArea.jsx
import React from "react";
import "./Input.css";

const TextArea = ({ label, error, id, rows = 4, className = "", ...rest }) => {
  const areaId = id || `textarea-${label?.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className={`ui-field ${className}`}>
      {label && <label htmlFor={areaId}>{label}</label>}
      <textarea id={areaId} rows={rows} className={`ui-textarea ${error ? "ui-input-error" : ""}`} {...rest} />
      {error && <span className="ui-field-error" role="alert">{error}</span>}
    </div>
  );
};

export default TextArea;
