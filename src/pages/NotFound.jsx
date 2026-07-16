// filename: frontend/src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => (
  <div className="not-found">
    <h1>404</h1>
    <p>This page wandered off your resume timeline.</p>
    <Link to="/">Back home</Link>
  </div>
);

export default NotFound;
