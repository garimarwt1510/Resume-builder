// filename: frontend/src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import * as adminService from "../services/adminService";
import { notifyError } from "../utils/toast";
import StatsCard from "../components/admin/StatsCard";
import LogsTable from "../components/admin/LogsTable";
import Loader from "../components/common/Loader";
import "./Admin.css";

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [statsRes, usersRes, logsRes] = await Promise.all([
          adminService.getStats(),
          adminService.getUsers(),
          adminService.getLogs(50),
        ]);
        setStats(statsRes);
        setUsers(usersRes.users);
        setLogs(logsRes.logs);
      } catch {
        notifyError("Could not load admin data.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader fullScreen message="Loading admin dashboard…" />;

  return (
    <div className="container admin-page">
      <h1>Admin dashboard</h1>
      <p className="admin-subtitle">Platform overview and activity logs.</p>

      <div className="admin-stats-grid">
        <StatsCard label="Total users" value={stats.userCount} icon="👥" />
        <StatsCard label="Total resumes" value={stats.resumeCount} icon="📄" />
        <StatsCard label="Admins" value={stats.adminCount} icon="🛡️" />
      </div>

      <section className="admin-section">
        <h2>Recent users</h2>
        <div className="admin-users-list">
          {users.slice(0, 10).map((u) => (
            <div className="admin-user-row" key={u._id}>
              <span>{u.name}</span>
              <span className="admin-user-email">{u.email}</span>
              <span className="admin-user-role">{u.role}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <h2>Activity logs</h2>
        <LogsTable logs={logs} />
      </section>
    </div>
  );
};

export default Admin;
