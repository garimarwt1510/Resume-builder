// filename: frontend/src/components/common/Loader.jsx
import React from "react";
import "./Loader.css";

/**
 * Full-area loading spinner with an optional message.
 * size: "sm" | "md" | "lg"
 */
const Loader = ({ size = "md", message, fullScreen = false }) => (
  <div className={`loader-wrap ${fullScreen ? "loader-fullscreen" : ""}`}>
    <div className={`loader-spinner loader-${size}`} role="status" aria-live="polite">
      <span className="visually-hidden">Loading…</span>
    </div>
    {message && <p className="loader-message">{message}</p>}
  </div>
);

export default Loader;
