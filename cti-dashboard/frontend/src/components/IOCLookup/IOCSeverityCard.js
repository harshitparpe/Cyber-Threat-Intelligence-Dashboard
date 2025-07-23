import React from "react";
import "./IOCSeverityCard.css";

const severityColors = {
  LOW: "green",
  MEDIUM: "orange",
  HIGH: "red",
};

const IOCSeverityCard = ({ iocData }) => {
  return (
    <div className="ioc-severity-card">
      <h3>{iocData.ioc}</h3>
      <p>Type: {iocData.type}</p>
      <p>Source: {iocData.source}</p>
      <p>Last Seen: {new Date(iocData.last_seen).toLocaleString()}</p>
      <p>
        Severity:{" "}
        <span className={`severity-badge ${iocData.severity.toLowerCase()}`}>
          {iocData.severity}
        </span>
      </p>
    </div>
  );
};

export default IOCSeverityCard;
