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

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Partial ISO3 to ISO2 mapping (add more as needed)
const ISO3_TO_ISO2 = {
  USA: "US",
  IND: "IN",
  CHN: "CN",
  RUS: "RU",
  BRA: "BR",
  AUS: "AU",
  CAN: "CA",
  DEU: "DE",
  GBR: "GB",
  FRA: "FR",
  ARG: "AR",
  JPN: "JP",
  LBN: "LB",
};

const ThreatMap = () => {
  const [iocData, setIocData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapStats, setMapStats] = useState({ min: 0, max: 0, total: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/map/ioc/country-counts",
          {
            timeout: 10000,
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data.success) {
          const data = {};
          let totalCount = 0;

          response.data.data.forEach((entry) => {
            const code = entry.country?.toUpperCase().trim();
            if (code) {
              data[code] = entry.count;
              totalCount += entry.count;
            }
          });

          setIocData(data);

          const counts = Object.values(data);
          setMapStats({
            min: Math.min(...counts, 0),
            max: Math.max(...counts, 1),
            total: totalCount,
            countries: counts.length,
          });
        } else {
          throw new Error(response.data.message || "Failed to fetch data");
        }
      } catch (err) {
        console.error("Error fetching IOC data:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const colorScale = scaleLinear()
    .domain([0, mapStats.max])
    .range(["rgba(76, 201, 240, 0.1)", "rgba(76, 201, 240, 1.0)"]);

  const getFillColor = (countryCode) => {
    const count = iocData[countryCode] || 0;
    return count === 0 ? "rgba(76, 201, 240, 0.05)" : colorScale(count);
  };

  const getTooltipContent = (countryName, count) =>
    `${countryName}: ${count} IOC looked up`;

  if (loading) {
    return (
      <div className="text-white min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-600 border-t-blue-400 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🌍</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Loading Threat Map</h2>
          <p className="text-gray-400">Fetching global IOC data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-6 text-6xl">⚠️</div>
          <h2 className="text-2xl font-bold mb-4 text-red-400">
            Map Loading Failed
          </h2>
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-300 mb-4">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium"
            >
              Retry Loading
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white min-h-screen bg-gray-900">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          🌍 IOC Threat Map
        </h1>
      </div>

      <div className="p-6">
        <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{ scale: 160 }}
            style={{
              width: "100%",
              height: "600px",
              background: "transparent",
            }}
          >
            <ZoomableGroup center={[0, 0]} zoom={1} maxZoom={8}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const raw3 =
                      geo.properties.ISO_A3 || geo.properties.ADM0_A3 || "";
                    const iso2 = ISO3_TO_ISO2[raw3] || raw3;
                    const countryCode = iso2.toUpperCase().trim();

                    const countryName =
                      geo.properties.NAME ||
                      geo.properties.ADMIN ||
                      geo.properties.name;

                    const count = iocData[countryCode] || 0;

                    console.log({
                      countryName,
                      countryCode,
                      count,
                    });

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        data-tooltip-id="map-tooltip"
                        data-tooltip-content={getTooltipContent(
                          countryName,
                          count
                        )}
                        style={{
                          default: {
                            fill: getFillColor(countryCode),
                            stroke: "rgba(255, 255, 255, 0.15)",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                          hover: {
                            fill: "#00c8ffff",
                            stroke: "rgba(255, 255, 255, 0.4)",
                            strokeWidth: 1,
                            outline: "none",
                            cursor: "pointer",
                          },
                          pressed: {
                            fill: "#00c8ffff",
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>

      <Tooltip
        id="map-tooltip"
        style={{
          backgroundColor: "rgba(17, 24, 39, 0.95)",
          color: "#fff",
          borderRadius: "12px",
          fontSize: "0.875rem",
          padding: "12px 16px",
          border: "1px solid rgba(76, 201, 240, 0.4)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          zIndex: 1000,
          backdropFilter: "blur(8px)",
        }}
        place="top"
        delayShow={100}
        delayHide={50}
      />
    </div>
  );
};

export default ThreatMap;
