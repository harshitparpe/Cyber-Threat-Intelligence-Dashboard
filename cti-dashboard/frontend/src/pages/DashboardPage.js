// frontend/src/pages/DashboardPage.js
import { useEffect, useState } from "react";
import axios from "axios";
import ThreatFeed from "../components/Dashboard/ThreatFeed";
import ThreatStats from "../components/Dashboard/ThreatStats";

function DashboardPage() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/incidents/stats"
        );
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <ThreatStats stats={stats} />
      <ThreatFeed />
    </div>
  );
}

export default DashboardPage;
