// filename: frontend/src/pages/ResumePreviewPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as resumeService from "../services/resumeService";
import { downloadResumePDF } from "../utils/pdfGenerator.jsx";
import { notifyError, notifySuccess } from "../utils/toast";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import ResumePreview from "../components/resume/ResumePreview";
import "./ResumePreviewPage.css";

const ResumePreviewPage = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { resume } = await resumeService.getResumeById(id);
        setResume(resume);
      } catch {
        notifyError("Could not load this resume.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadResumePDF(resume);
      notifySuccess("PDF downloaded");
    } catch {
      notifyError("Could not generate PDF.");
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => window.print();

  if (loading || !resume) return <Loader fullScreen message="Loading preview…" />;

  return (
    <div className="preview-page">
      <div className="preview-toolbar no-print">
        <div className="container preview-toolbar-inner">
          <Link to={`/resume/${id}`}>← Back to editor</Link>
          <div className="preview-toolbar-actions">
            <Button variant="secondary" onClick={handlePrint}>Print</Button>
            <Button onClick={handleDownload} loading={downloading}>Download PDF</Button>
          </div>
        </div>
      </div>
      <div className="preview-canvas">
        <ResumePreview resume={resume} />
      </div>
    </div>
  );
};

export default ResumePreviewPage;
