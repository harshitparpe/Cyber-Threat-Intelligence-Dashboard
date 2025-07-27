import React from "react";
import "./IOCSeverityCard.css";

const getSeverityLabel = (score) => {
  if (score >= 80) return { label: "HIGH", level: "high" };
  if (score >= 50) return { label: "MEDIUM", level: "medium" };
  return { label: "LOW", level: "low" };
};

const IOCSeverityCard = ({ iocData }) => {
  const {
    ipAddress,
    abuseConfidenceScore,
    countryCode,
    isp,
    domain,
    totalReports,
    lastReportedAt,
  } = iocData;

  const { label, level } = getSeverityLabel(abuseConfidenceScore);

  return (
    <div className="ioc-severity-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">🧠 IOC Details</h3>
        <span className={`severity-badge ${level}`}>{label}</span>
      </div>

      <ul className="space-y-2 text-sm sm:text-base">
        <li>
          <strong>IP Address:</strong> {ipAddress}
        </li>
        <li>
          <strong>Abuse Score:</strong> {abuseConfidenceScore} / 100
        </li>
        <li>
          <strong>Country:</strong> {countryCode || "N/A"}
        </li>
        <li>
          <strong>ISP:</strong> {isp || "N/A"}
        </li>
        <li>
          <strong>Domain:</strong> {domain || "N/A"}
        </li>
        <li>
          <strong>Total Reports:</strong> {totalReports}
        </li>
        <li>
          <strong>Last Reported:</strong> {lastReportedAt || "N/A"}
        </li>
      </ul>
    </div>
  );
};

export default IOCSeverityCard;
