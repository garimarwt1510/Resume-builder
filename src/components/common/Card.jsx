// filename: frontend/src/components/common/Card.jsx
import React from "react";
import "./Card.css";

const Card = ({ children, className = "", padded = true, hoverable = false, ...rest }) => (
  <div
    className={`ui-card ${padded ? "ui-card-padded" : ""} ${hoverable ? "ui-card-hoverable" : ""} ${className}`}
    {...rest}
  >
    {children}
  </div>
);

export default Card;
