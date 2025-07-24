import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ThreatFeed.css";

const ThreatFeed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/threats/feed");
      setFeed(res.data);
    } catch (err) {
      console.error("Failed to fetch threat feed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="threat-feed">
      <h3>📡 Recent Threat Feed</h3>
      {loading ? (
        <p>Loading...</p>
      ) : feed.length === 0 ? (
        <p>No recent threats.</p>
      ) : (
        feed.map((item) => (
          <div
            key={item.id}
            className={`feed-item ${item.severity.toLowerCase()}`}
          >
            <div>
              <strong>{item.title}</strong>
              <p>Severity: {item.severity}</p>
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

export default ThreatFeed;
