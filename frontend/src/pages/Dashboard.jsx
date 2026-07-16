// filename: frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as resumeService from "../services/resumeService";
import { useDebounce } from "../hooks/useDebounce";
import { notifySuccess, notifyError } from "../utils/toast";
import { EMPTY_RESUME } from "../utils/constants";
import ResumeList from "../components/dashboard/ResumeList";
import SearchBar from "../components/dashboard/SearchBar";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import "./Dashboard.css";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const debouncedSearch = useDebounce(search, 350);
  const navigate = useNavigate();

  const fetchResumes = async (query = "") => {
    setLoading(true);
    try {
      const { resumes } = await resumeService.getResumes(query);
      setResumes(resumes);
    } catch {
      notifyError("Could not load your resumes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const { resume } = await resumeService.createResume(EMPTY_RESUME);
      notifySuccess("New resume created");
      navigate(`/resume/${resume._id}`);
    } catch {
      notifyError("Could not create a new resume.");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resume? This can't be undone.")) return;
    try {
      await resumeService.deleteResume(id);
      setResumes((prev) => prev.filter((r) => r._id !== id));
      notifySuccess("Resume deleted");
    } catch {
      notifyError("Could not delete resume.");
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const { resume } = await resumeService.duplicateResume(id);
      setResumes((prev) => [resume, ...prev]);
      notifySuccess("Resume duplicated");
    } catch {
      notifyError("Could not duplicate resume.");
    }
  };

  return (
    <div className="container dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Your resumes</h1>
          <p className="dashboard-subtitle">{resumes.length} saved</p>
        </div>
        <div className="dashboard-header-actions">
          <SearchBar value={search} onChange={setSearch} />
          <Button onClick={handleCreate} loading={creating}>+ New resume</Button>
        </div>
      </div>

      {loading ? (
        <Loader message="Loading your resumes…" />
      ) : resumes.length === 0 ? (
        <EmptyState
          icon="📝"
          title={search ? "No matches found" : "No resumes yet"}
          message={search ? "Try a different search term." : "Create your first resume to get started."}
          action={!search && <Button onClick={handleCreate}>Create your first resume</Button>}
        />
      ) : (
        <ResumeList resumes={resumes} onDelete={handleDelete} onDuplicate={handleDuplicate} />
      )}
    </div>
  );
};

export default Dashboard;
