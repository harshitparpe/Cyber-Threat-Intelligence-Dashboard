import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoPath } from "d3-geo";
import axios from "axios";
import "./ThreatMap.css";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const ThreatMap = () => {
  const [data, setData] = useState([]);
  const [tooltip, setTooltip] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/threats/map")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const getColor = (count) => {
    if (count > 20) return "#ff4c4c";
    if (count > 10) return "#ffa500";
    if (count > 0) return "#28a745";
    return "#444";
  };

  const countryCountMap = data.reduce((acc, cur) => {
    acc[cur._id] = cur.count;
    return acc;
  }, {});

  return (
    <div className="map-container">
      <ComposableMap
        projectionConfig={{ scale: 140 }}
        width={800}
        height={400}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const country = geo.properties.NAME;
              const count = countryCountMap[country] || 0;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltip(`${country}: ${count} threats`);
                  }}
                  onMouseLeave={() => {
                    setTooltip("");
                  }}
                  style={{
                    default: {
                      fill: getColor(count),
                      outline: "none",
                    },
                    hover: {
                      fill: "#00c8ff",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#6e57e0",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltip && <div className="tooltip">{tooltip}</div>}
    </div>
  );
};

export default ThreatMap;
