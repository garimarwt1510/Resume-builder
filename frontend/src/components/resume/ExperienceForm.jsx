// filename: frontend/src/components/resume/ExperienceForm.jsx
import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import AIButton from "../common/AIButton";
import { streamAI, aiEndpoints } from "../../services/aiService";
import { notifyError, notifySuccess } from "../../utils/toast";
import "./RepeatableList.css";

const emptyEntry = { company: "", role: "", location: "", startDate: "", endDate: "", current: false, bullets: [] };

const ExperienceForm = ({ items = [], onChange }) => {
  const [improvingIndex, setImprovingIndex] = useState(null);

  const update = (index, field, value) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };
  const add = () => onChange([...items, { ...emptyEntry }]);
  const remove = (index) => onChange(items.filter((_, i) => i !== index));

  const addBullet = (index) => update(index, "bullets", [...(items[index].bullets || []), ""]);
  const updateBullet = (index, bulletIndex, value) => {
    const bullets = [...(items[index].bullets || [])];
    bullets[bulletIndex] = value;
    update(index, "bullets", bullets);
  };
  const removeBullet = (index, bulletIndex) => {
    const bullets = (items[index].bullets || []).filter((_, i) => i !== bulletIndex);
    update(index, "bullets", bullets);
  };

  const improveWithAI = async (index) => {
    const entry = items[index];
    if (!entry.bullets?.length || entry.bullets.every((b) => !b.trim())) {
      notifyError("Add at least one bullet point first.");
      return;
    }
    setImprovingIndex(index);
    try {
      let full = "";
      await streamAI(
        aiEndpoints.improveExperience,
        { role: entry.role, company: entry.company, bullets: entry.bullets },
        (chunk) => { full += chunk; }
      );
      const improvedBullets = full.split("\n").map((l) => l.replace(/^[-•\d.\s]+/, "").trim()).filter(Boolean);
      if (improvedBullets.length) {
        update(index, "bullets", improvedBullets);
        notifySuccess("Bullets improved with AI");
      }
    } catch (err) {
      notifyError(err.message || "Could not improve bullets.");
    } finally {
      setImprovingIndex(null);
    }
  };

  return (
    <div>
      {items.map((item, i) => (
        <div className="repeatable-item" key={item._id || i}>
          <button type="button" className="repeatable-item-remove" onClick={() => remove(i)} aria-label="Remove experience entry">✕</button>
          <div className="repeatable-item-row">
            <Input label="Company" value={item.company} onChange={(e) => update(i, "company", e.target.value)} />
            <Input label="Role" value={item.role} onChange={(e) => update(i, "role", e.target.value)} />
            <Input label="Location" value={item.location} onChange={(e) => update(i, "location", e.target.value)} />
            <Input
              label="Currently working here?"
              type="checkbox"
              checked={item.current}
              onChange={(e) => update(i, "current", e.target.checked)}
              style={{ width: 20 }}
            />
            <Input label="Start date" placeholder="Jan 2022" value={item.startDate} onChange={(e) => update(i, "startDate", e.target.value)} />
            {!item.current && (
              <Input label="End date" placeholder="Mar 2024" value={item.endDate} onChange={(e) => update(i, "endDate", e.target.value)} />
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "12px 0 8px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-ink-soft)" }}>Bullet points</label>
            <AIButton onClick={() => improveWithAI(i)} loading={improvingIndex === i}>Improve with AI</AIButton>
          </div>
          <div className="bullets-list">
            {(item.bullets || []).map((bullet, bi) => (
              <div className="bullet-row" key={bi}>
                <input
                  className="ui-input"
                  value={bullet}
                  onChange={(e) => updateBullet(i, bi, e.target.value)}
                  placeholder="Led a cross-functional team to launch…"
                />
                <button type="button" className="bullet-remove" onClick={() => removeBullet(i, bi)} aria-label="Remove bullet">✕</button>
              </div>
            ))}
          </div>
          <Button size="sm" variant="ghost" onClick={() => addBullet(i)}>+ Add bullet</Button>
        </div>
      ))}
      <Button variant="secondary" onClick={add}>+ Add experience</Button>
    </div>
  );
};

export default ExperienceForm;
