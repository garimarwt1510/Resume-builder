// filename: frontend/src/components/common/EmptyState.jsx
import React from "react";
import "./EmptyState.css";

const EmptyState = ({ icon = "📄", title, message, action }) => (
  <div className="empty-state">
    <div className="empty-state-icon" aria-hidden="true">{icon}</div>
    <h3>{title}</h3>
    <p>{message}</p>
    {action}
  </div>
);

export default EmptyState;
