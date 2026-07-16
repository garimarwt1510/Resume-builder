// filename: frontend/src/components/resume/EducationForm.jsx
import React from "react";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import "./RepeatableList.css";

const emptyEntry = { school: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", grade: "", description: "" };

const EducationForm = ({ items = [], onChange }) => {
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
          <button type="button" className="repeatable-item-remove" onClick={() => remove(i)} aria-label="Remove education entry">✕</button>
          <div className="repeatable-item-row">
            <Input label="School" value={item.school} onChange={(e) => update(i, "school", e.target.value)} />
            <Input label="Degree" value={item.degree} onChange={(e) => update(i, "degree", e.target.value)} />
            <Input label="Field of study" value={item.fieldOfStudy} onChange={(e) => update(i, "fieldOfStudy", e.target.value)} />
            <Input label="Grade / GPA" value={item.grade} onChange={(e) => update(i, "grade", e.target.value)} />
            <Input label="Start date" placeholder="Sep 2019" value={item.startDate} onChange={(e) => update(i, "startDate", e.target.value)} />
            <Input label="End date" placeholder="Jun 2023" value={item.endDate} onChange={(e) => update(i, "endDate", e.target.value)} />
          </div>
          <TextArea label="Description (optional)" rows={2} value={item.description} onChange={(e) => update(i, "description", e.target.value)} />
        </div>
      ))}
      <Button variant="secondary" onClick={add}>+ Add education</Button>
    </div>
  );
};

export default EducationForm;
