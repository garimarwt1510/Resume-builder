// filename: frontend/src/components/dashboard/SearchBar.jsx
import React from "react";
import "./SearchBar.css";

const SearchBar = ({ value, onChange, placeholder = "Search resumes…" }) => (
  <div className="search-bar">
    <span className="search-bar-icon" aria-hidden="true">🔍</span>
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search resumes"
    />
  </div>
);

export default SearchBar;
