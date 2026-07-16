// filename: frontend/src/components/resume/LanguagesForm.jsx
import React from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import "./RepeatableList.css";

const PROFICIENCIES = ["Basic", "Conversational", "Fluent", "Native"].map((p) => ({ value: p, label: p }));
const emptyEntry = { name: "", proficiency: "Conversational" };

const LanguagesForm = ({ items = [], onChange }) => {
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
          <button type="button" className="repeatable-item-remove" onClick={() => remove(i)} aria-label="Remove language">✕</button>
          <div className="repeatable-item-row">
            <Input label="Language" value={item.name} onChange={(e) => update(i, "name", e.target.value)} />
            <Select label="Proficiency" options={PROFICIENCIES} value={item.proficiency} onChange={(e) => update(i, "proficiency", e.target.value)} />
          </div>
        </div>
      ))}
      <Button variant="secondary" onClick={add}>+ Add language</Button>
    </div>
  );
};

export default LanguagesForm;
