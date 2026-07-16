// filename: frontend/src/components/admin/StatsCard.jsx
import React from "react";
import Card from "../common/Card";
import "./StatsCard.css";

const StatsCard = ({ label, value, icon }) => (
  <Card className="stats-card">
    <span className="stats-card-icon">{icon}</span>
    <div>
      <div className="stats-card-value">{value}</div>
      <div className="stats-card-label">{label}</div>
    </div>
  </Card>
);

export default StatsCard;
