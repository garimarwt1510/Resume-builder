// filename: frontend/src/components/common/Select.jsx
import React from "react";
import "./Input.css";

const Select = ({ label, id, options = [], className = "", ...rest }) => {
  const selectId = id || `select-${label?.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className={`ui-field ${className}`}>
      {label && <label htmlFor={selectId}>{label}</label>}
      <select id={selectId} className="ui-select" {...rest}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
