// filename: frontend/src/components/resume/CustomSectionForm.jsx
import React from "react";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import "./RepeatableList.css";

const emptyEntry = { title: "", content: "" };

const CustomSectionForm = ({ items = [], onChange }) => {
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
          <button type="button" className="repeatable-item-remove" onClick={() => remove(i)} aria-label="Remove section">✕</button>
          <Input label="Section title" value={item.title} onChange={(e) => update(i, "title", e.target.value)} />
          <TextArea label="Content" rows={3} value={item.content} onChange={(e) => update(i, "content", e.target.value)} />
        </div>
      ))}
      <Button variant="secondary" onClick={add}>+ Add custom section</Button>
    </div>
  );
};

export default CustomSectionForm;
