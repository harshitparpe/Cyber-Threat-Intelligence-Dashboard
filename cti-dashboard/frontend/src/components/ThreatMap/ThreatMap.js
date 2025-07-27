// frontend/src/components/ThreatMap/ThreatMap.js
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const ThreatMap = () => {
  return (
    <div className="bg-slate-900 p-4 rounded-2xl shadow-lg">
      <h2 className="text-xl text-white mb-4">🌍 Global Threat Map</h2>
      <ComposableMap projection="geoMercator">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: "#3a0ca3", outline: "none" },
                  hover: { fill: "#7209b7", outline: "none" },
                  pressed: { fill: "#f72585", outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default ThreatMap;
