import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ThreatFeed.css";

const ThreatFeed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentIocs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard/recent-iocs"
      );
      setFeed(res.data);
    } catch (err) {
      console.error("Failed to fetch recent IOCs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentIocs();
  }, []);

  return (
    <div className="threat-feed">
      <h3>🧾 Recent IOC Lookups</h3>
      {loading ? (
        <p>Loading...</p>
      ) : feed.length === 0 ? (
        <p>No recent IOCs.</p>
      ) : (
        feed.map((item, idx) => (
          <div
            key={idx}
            className={`feed-item ${getSeverityClass(
              item.abuseConfidenceScore
            )}`}
          >
            <div>
              <strong>{item.query}</strong> ({item.type})
              <p>
                Country: {item.country} <br />
                Severity: {getSeverityLabel(item.abuseConfidenceScore)}
              </p>
            </div>
            <div>
              <p>{new Date(item.timestamp).toLocaleString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const getSeverityLabel = (score) => {
  if (score >= 85) return "High";
  if (score >= 50) return "Medium";
  if (score >= 1) return "Low";
  return "N/A";
};

const getSeverityClass = (score) => {
  if (score >= 85) return "high";
  if (score >= 50) return "medium";
  if (score >= 1) return "low";
  return "";
};

export default ThreatFeed;
