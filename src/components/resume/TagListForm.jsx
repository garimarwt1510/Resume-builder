// filename: frontend/src/components/resume/TagListForm.jsx
import React, { useState } from "react";
import "./RepeatableList.css";

/**
 * Generic tag-style input for simple string-array sections (skills,
 * achievements, interests). Press Enter or click Add to append a tag.
 */
const TagListForm = ({ items = [], onChange, placeholder = "Type and press Enter…" }) => {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const value = draft.trim();
    if (!value) return;
    onChange([...items, value]);
    setDraft("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (index) => onChange(items.filter((_, i) => i !== index));

  return (
    <div>
      <div className="tag-input-row">
        <input
          className="ui-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <button type="button" className="btn btn-secondary btn-sm" onClick={addTag}>Add</button>
      </div>
      <div className="tag-list">
        {items.map((tag, i) => (
          <span className="tag-chip" key={i}>
            {tag}
            <button type="button" onClick={() => removeTag(i)} aria-label={`Remove ${tag}`}>✕</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagListForm;
