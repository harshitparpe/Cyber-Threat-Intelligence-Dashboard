import React from "react";

const IncidentList = ({ incidents, onSelect }) => {
  return (
    <div>
      <h3>Incident List</h3>
      {incidents.map((incident) => (
        <div key={incident._id} onClick={() => onSelect(incident)}>
          <strong>{incident.title}</strong> - {incident.severity} -{" "}
          {incident.status}
        </div>
      ))}
    </div>
  );
};

export default IncidentList;
