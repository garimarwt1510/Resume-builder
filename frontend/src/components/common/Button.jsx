// filename: frontend/src/components/common/Button.jsx
import React from "react";
import "./Button.css";

/**
 * Reusable button. variant: "primary" | "secondary" | "ghost" | "danger"
 * size: "sm" | "md" | "lg"
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon = null,
  type = "button",
  onClick,
  fullWidth = false,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? "btn-full" : ""}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <span className="btn-spinner" aria-hidden="true" /> : icon}
      <span>{children}</span>
    </button>
  );
};

export default Button;
