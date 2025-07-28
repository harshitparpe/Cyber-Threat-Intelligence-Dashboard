import React from "react";

const IncidentList = ({ incidents, onSelect }) => {
  return (
    <div className="incident-list">
      <h3>Reported Incidents</h3>
      {incidents.length === 0 && <p>No incidents reported yet.</p>}
      {incidents.map((incident) => (
        <div
          key={incident._id}
          onClick={() => onSelect(incident)}
          className="incident-card"
        >
          <strong>{incident.title}</strong> — {incident.severity} —{" "}
          {incident.status}
        </div>
      ))}
    </div>
  );
};

export default IncidentList;
