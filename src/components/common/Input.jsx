// filename: frontend/src/components/common/Input.jsx
import React from "react";
import "./Input.css";

/**
 * Labeled text input with inline validation error display.
 */
const Input = ({ label, error, id, className = "", ...rest }) => {
  const inputId = id || `input-${label?.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className={`ui-field ${className}`}>
      {label && <label htmlFor={inputId}>{label}</label>}
      <input id={inputId} className={`ui-input ${error ? "ui-input-error" : ""}`} {...rest} />
      {error && <span className="ui-field-error" role="alert">{error}</span>}
    </div>
  );
};

export default Input;
