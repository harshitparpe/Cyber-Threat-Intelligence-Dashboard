// frontend/src/components/Dashboard/ThreatStats.js
import React from "react";
import "./ThreatStats.css";

const ThreatStats = ({ stats = {} }) => {
  return (
    <div className="stats-container">
      <h2>🧠 Threat Stats</h2>
      {/* Row 1 - Severity */}
      <div className="stats-row">
        <div className="stats-card low">
          <h3>Low</h3>
          <p>{stats.low || 0}</p>
        </div>
        <div className="stats-card medium">
          <h3>Medium</h3>
          <p>{stats.medium || 0}</p>
        </div>
        <div className="stats-card high">
          <h3>High</h3>
          <p>{stats.high || 0}</p>
        </div>
      </div>

      {/* Row 2 - Status */}
      <div className="stats-row">
        <div className="stats-card open">
          <h3>Open</h3>
          <p>{stats.open || 0}</p>
        </div>
        <div className="stats-card investigating">
          <h3>Investigating</h3>
          <p>{stats.investigating || 0}</p>
        </div>
        <div className="stats-card resolved">
          <h3>Resolved</h3>
          <p>{stats.resolved || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default ThreatStats;
