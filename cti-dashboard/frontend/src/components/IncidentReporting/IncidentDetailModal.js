import React from "react";

const IncidentDetailModal = ({ incident, onClose }) => {
  if (!incident) return null;

  return (
    <div className="incident-modal">
      <div className="modal-content">
        <h2>{incident.title}</h2>
        <p>
          <strong>Description:</strong> {incident.description}
        </p>
        <p>
          <strong>Severity:</strong> {incident.severity}
        </p>
        <p>
          <strong>Status:</strong> {incident.status}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(incident.created_at).toLocaleString()}
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default IncidentDetailModal;
