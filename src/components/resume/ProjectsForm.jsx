// filename: frontend/src/components/resume/ProjectsForm.jsx
import React from "react";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import "./RepeatableList.css";

const emptyEntry = { title: "", link: "", techStack: [], description: "", bullets: [] };

const ProjectsForm = ({ items = [], onChange }) => {
  const update = (index, field, value) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };
  const add = () => onChange([...items, { ...emptyEntry }]);
  const remove = (index) => onChange(items.filter((_, i) => i !== index));

  return (
    <div>
      {items.map((item, i) => (
        <div className="repeatable-item" key={item._id || i}>
          <button type="button" className="repeatable-item-remove" onClick={() => remove(i)} aria-label="Remove project">✕</button>
          <div className="repeatable-item-row">
            <Input label="Project title" value={item.title} onChange={(e) => update(i, "title", e.target.value)} />
            <Input label="Link" value={item.link} onChange={(e) => update(i, "link", e.target.value)} />
            <Input
              label="Tech stack (comma-separated)"
              value={(item.techStack || []).join(", ")}
              onChange={(e) => update(i, "techStack", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            />
          </div>
          <TextArea label="Description" rows={3} value={item.description} onChange={(e) => update(i, "description", e.target.value)} />
        </div>
      ))}
      <Button variant="secondary" onClick={add}>+ Add project</Button>
    </div>
  );
};

export default ProjectsForm;
