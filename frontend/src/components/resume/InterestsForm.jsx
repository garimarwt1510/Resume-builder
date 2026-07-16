// filename: frontend/src/components/resume/InterestsForm.jsx
import React from "react";
import TagListForm from "./TagListForm";

const InterestsForm = ({ items = [], onChange }) => (
  <TagListForm items={items} onChange={onChange} placeholder="e.g. Rock climbing" />
);

export default InterestsForm;
