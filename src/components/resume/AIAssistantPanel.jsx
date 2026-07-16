// filename: frontend/src/components/resume/AIAssistantPanel.jsx
import React, { useState } from "react";
import { streamAI, aiEndpoints } from "../../services/aiService";
import { resumeToPlainText } from "../../utils/resumeText";
import { notifyError, notifySuccess } from "../../utils/toast";
import Button from "../common/Button";
import TextArea from "../common/TextArea";
import Input from "../common/Input";
import Select from "../common/Select";
import "./AIAssistantPanel.css";

const TABS = [
  { id: "review", label: "Resume Review" },
  { id: "ats", label: "ATS Check" },
  { id: "cover", label: "Cover Letter" },
  { id: "tone", label: "Tone & Grammar" },
];

const TONE_OPTIONS = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "executive", label: "Executive" },
];

/**
 * Sidebar/tab panel hosting the "whole resume" AI tools: review, ATS
 * scoring against a pasted job description, cover letter generation, and
 * a free-text tone/grammar rewriter the user can paste any snippet into.
 */
const AIAssistantPanel = ({ resume }) => {
  const [activeTab, setActiveTab] = useState("review");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [coverCompany, setCoverCompany] = useState("");
  const [coverTone, setCoverTone] = useState("professional");
  const [freeText, setFreeText] = useState("");
  const [rewriteTone, setRewriteTone] = useState("professional");

  const runStream = async (endpoint, body) => {
    setLoading(true);
    setOutput("");
    try {
      let full = "";
      await streamAI(endpoint, body, (chunk) => {
        full += chunk;
        setOutput(full);
      });
      notifySuccess("AI response ready");
    } catch (err) {
      notifyError(err.message || "AI request failed.");
    } finally {
      setLoading(false);
    }
  };

  const resumeText = resumeToPlainText(resume);

  return (
    <div className="ai-panel">
      <div className="ai-panel-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`ai-panel-tab ${activeTab === t.id ? "active" : ""}`}
            onClick={() => { setActiveTab(t.id); setOutput(""); }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="ai-panel-body">
        {activeTab === "review" && (
          <>
            <p className="ai-panel-hint">Get a structured critique of your resume as it stands now.</p>
            <Button loading={loading} onClick={() => runStream(aiEndpoints.review, { resumeText })}>
              Review my resume
            </Button>
          </>
        )}

        {activeTab === "ats" && (
          <>
            <p className="ai-panel-hint">Paste a job description to check keyword match and get an ATS score.</p>
            <TextArea rows={5} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste job description here…" />
            <Button loading={loading} onClick={() => runStream(aiEndpoints.atsCheck, { resumeText, jobDescription })}>
              Run ATS check
            </Button>
          </>
        )}

        {activeTab === "cover" && (
          <>
            <p className="ai-panel-hint">Generate a tailored cover letter based on your resume summary.</p>
            <Input label="Company (optional)" value={coverCompany} onChange={(e) => setCoverCompany(e.target.value)} />
            <Select label="Tone" options={TONE_OPTIONS} value={coverTone} onChange={(e) => setCoverTone(e.target.value)} />
            <Button
              loading={loading}
              onClick={() =>
                runStream(aiEndpoints.coverLetter, {
                  jobTitle: resume.personalInfo?.jobTitle,
                  company: coverCompany,
                  resumeSummary: resumeText,
                  tone: coverTone,
                })
              }
            >
              Generate cover letter
            </Button>
          </>
        )}

        {activeTab === "tone" && (
          <>
            <p className="ai-panel-hint">Paste any text from your resume to correct grammar or shift its tone.</p>
            <TextArea rows={5} value={freeText} onChange={(e) => setFreeText(e.target.value)} placeholder="Paste a paragraph or bullet points…" />
            <div className="ai-panel-tone-row">
              <Select label="Tone" options={TONE_OPTIONS} value={rewriteTone} onChange={(e) => setRewriteTone(e.target.value)} />
              <div className="ai-panel-tone-buttons">
                <Button size="sm" variant="secondary" loading={loading} onClick={() => runStream(aiEndpoints.grammar, { text: freeText })}>
                  Fix grammar
                </Button>
                <Button size="sm" loading={loading} onClick={() => runStream(aiEndpoints.tone, { text: freeText, tone: rewriteTone })}>
                  Rewrite tone
                </Button>
              </div>
            </div>
          </>
        )}

        {output && (
          <div className="ai-panel-output">
            <div className="ai-panel-output-header">
              <span>AI output</span>
              <button onClick={() => { navigator.clipboard.writeText(output); notifySuccess("Copied to clipboard"); }}>
                Copy
              </button>
            </div>
            <pre>{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantPanel;
