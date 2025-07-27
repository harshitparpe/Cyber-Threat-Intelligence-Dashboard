import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { scaleLinear } from "d3-scale";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const ThreatMap = () => {
  const [iocData, setIocData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/map/ioc/country-counts"
        );
        const data = {};
        res.data.forEach((entry) => {
          data[entry.country.toUpperCase()] = entry.count;
        });
        setIocData(data);
      } catch (error) {
        console.error("Failed to fetch IOC country data:", error);
      }
    };

    fetchData();
  }, []);

  const max = Math.max(...Object.values(iocData), 1);
  const colorScale = scaleLinear()
    .domain([0, max])
    .range(["#4cc9f022", "#4cc9f0"]);

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">🌍 IOC Threat Map</h2>
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 130 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const code = geo.properties.ISO_A2;
                const name = geo.properties.ADMIN;
                const count = iocData[code] || 0;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    data-tooltip-id="tooltip-id"
                    data-tooltip-content={`${name} (${code}): ${count} lookup(s)`}
                    style={{
                      default: { fill: colorScale(count), outline: "none" },
                      hover: { fill: "#f72585", outline: "none" },
                      pressed: { fill: "#f72585", outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      <Tooltip
        id="tooltip-id"
        style={{
          backgroundColor: "#1e293b",
          color: "#fff",
          borderRadius: "6px",
          fontSize: "0.875rem",
          padding: "0.5rem 1rem",
        }}
      />
    </div>
  );
};

export default ThreatMap;
