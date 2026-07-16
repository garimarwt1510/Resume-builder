// filename: frontend/src/components/resume/ReferencesForm.jsx
import React from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import "./RepeatableList.css";

const emptyEntry = { name: "", relationship: "", company: "", email: "", phone: "" };

const ReferencesForm = ({ items = [], onChange }) => {
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
          <button type="button" className="repeatable-item-remove" onClick={() => remove(i)} aria-label="Remove reference">✕</button>
          <div className="repeatable-item-row">
            <Input label="Name" value={item.name} onChange={(e) => update(i, "name", e.target.value)} />
            <Input label="Relationship" value={item.relationship} onChange={(e) => update(i, "relationship", e.target.value)} />
            <Input label="Company" value={item.company} onChange={(e) => update(i, "company", e.target.value)} />
            <Input label="Email" type="email" value={item.email} onChange={(e) => update(i, "email", e.target.value)} />
            <Input label="Phone" value={item.phone} onChange={(e) => update(i, "phone", e.target.value)} />
          </div>
        </div>
      ))}
      <Button variant="secondary" onClick={add}>+ Add reference</Button>
    </div>
  );
};

export default ReferencesForm;
