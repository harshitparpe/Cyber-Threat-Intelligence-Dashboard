import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardStats.css";
import { ShieldAlert, AlertTriangle, Globe, TrendingUp } from "lucide-react";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalIocs: 0,
    highRiskIps: 0,
    uniqueCountries: 0,
    lookupsToday: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/dashboard/stats"
        );
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total IOCs",
      value: stats.totalIocs,
      icon: <ShieldAlert size={20} color="#3a86ff" />,
    },
    {
      label: "High Risk IPs",
      value: stats.highRiskIps,
      icon: <AlertTriangle size={20} color="#ff006e" />,
    },
    {
      label: "Countries Tracked",
      value: stats.uniqueCountries,
      icon: <Globe size={20} color="#8338ec" />,
    },
    {
      label: "Lookups Today",
      value: stats.lookupsToday,
      icon: <TrendingUp size={20} color="#ffbe0b" />,
    },
  ];

  return (
    <div className="dashboard-stats-grid">
      {cards.map((card) => (
        <div key={card.label} className="stat-card">
          <div className="card-icon">{card.icon}</div>
          <div className="card-info">
            <h4>{card.label}</h4>
            <p>{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
