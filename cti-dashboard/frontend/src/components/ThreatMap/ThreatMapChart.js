import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import "./ThreatMapChart.css";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const ThreatMapChart = () => {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/map/data");
        setThreats(res.data);
      } catch (err) {
        console.error("Failed to fetch map data", err);
      }
    };
    fetchThreats();
  }, []);

  const getColor = (severity) => {
    switch (severity) {
      case "High":
        return "#ff4d4d";
      case "Medium":
        return "#ffc107";
      case "Low":
        return "#00ffcc";
      default:
        return "#999";
    }
  };

  return (
    <div className="map-container">
      <h2>🌍 Global Threat Map</h2>
      <ComposableMap projectionConfig={{ scale: 140 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#1a1a2e",
                    stroke: "#444",
                    strokeWidth: 0.5,
                  },
                }}
              />
            ))
          }
        </Geographies>

        {threats.map((t) => (
          <Marker key={t.id} coordinates={t.coordinates}>
            <circle
              r={6}
              fill={getColor(t.severity)}
              stroke="#fff"
              strokeWidth={1}
            />
            <text
              textAnchor="middle"
              y={-10}
              style={{ fill: "#fff", fontSize: "0.6em" }}
            >
              {t.location}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default ThreatMapChart;
