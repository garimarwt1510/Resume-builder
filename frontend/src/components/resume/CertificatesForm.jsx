// filename: frontend/src/components/resume/CertificatesForm.jsx
import React from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import "./RepeatableList.css";

const emptyEntry = { name: "", issuer: "", date: "", link: "" };

const CertificatesForm = ({ items = [], onChange }) => {
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
          <button type="button" className="repeatable-item-remove" onClick={() => remove(i)} aria-label="Remove certificate">✕</button>
          <div className="repeatable-item-row">
            <Input label="Certificate name" value={item.name} onChange={(e) => update(i, "name", e.target.value)} />
            <Input label="Issuer" value={item.issuer} onChange={(e) => update(i, "issuer", e.target.value)} />
            <Input label="Date" placeholder="Jun 2023" value={item.date} onChange={(e) => update(i, "date", e.target.value)} />
            <Input label="Link" value={item.link} onChange={(e) => update(i, "link", e.target.value)} />
          </div>
        </div>
      ))}
      <Button variant="secondary" onClick={add}>+ Add certificate</Button>
    </div>
  );
};

export default CertificatesForm;
