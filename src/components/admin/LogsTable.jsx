// filename: frontend/src/components/admin/LogsTable.jsx
import React from "react";
import "./LogsTable.css";

const LogsTable = ({ logs }) => (
  <div className="logs-table-wrap">
    <table className="logs-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>User</th>
          <th>Action</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log._id}>
            <td>{new Date(log.createdAt).toLocaleString()}</td>
            <td>{log.user?.name || "Unknown"}</td>
            <td><span className="logs-action-badge">{log.action}</span></td>
            <td>{log.details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LogsTable;
