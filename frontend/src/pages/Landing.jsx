// filename: frontend/src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Card from "../components/common/Card";
import "./Landing.css";

const FEATURES = [
  { title: "Write with AI", text: "Generate summaries, bullet points, and cover letters tuned to your role in seconds." },
  { title: "Beat the bots", text: "Run ATS optimization checks against a real job description before you apply." },
  { title: "5 crafted templates", text: "Modern, Professional, Minimal, Creative, and ATS-friendly layouts, all print-ready." },
  { title: "Autosaved, always", text: "Every change is saved automatically — duplicate, edit, or export any time." },
];

const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing">
      <section className="landing-hero">
        <div className="container landing-hero-inner">
          <p className="landing-eyebrow">AI-assisted resume builder</p>
          <h1>
            Draft a resume that reads like your <em>best</em> career day, not your worst writer's block.
          </h1>
          <p className="landing-sub">
            Ceresum pairs a structured resume editor with an AI co-writer — summaries, bullet
            rewrites, ATS scoring, and cover letters, streamed to you as they're written.
          </p>
          <div className="landing-cta-row">
            <Link to={isAuthenticated ? "/dashboard" : "/register"} className="landing-cta-primary">
              {isAuthenticated ? "Go to dashboard" : "Start building — it's free"}
            </Link>
            <Link to="/login" className="landing-cta-secondary">I already have an account</Link>
          </div>
        </div>
        <div className="landing-hero-seal" aria-hidden="true">◆</div>
      </section>

      <section className="container landing-features">
        {FEATURES.map((f) => (
          <Card key={f.title} hoverable className="landing-feature-card">
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Landing;
