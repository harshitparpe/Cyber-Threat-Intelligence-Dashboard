import React, { useState, useEffect } from "react";
import { lookupIOC } from "../../services/iocApi";
import { saveIocHistory, getIocHistory } from "../../services/iocService";
import IOCSeverityCard from "./IOCSeverityCard";
import "./IOCSearch.css";

const IOCSearch = () => {
  const [ioc, setIoc] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const hist = await getIocHistory();
    setHistory(hist);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setData(null);
    try {
      const result = await lookupIOC(ioc);
      setData(result);

      const iocPayload = {
        ipAddress: result.ipAddress,
        abuseConfidenceScore: result.abuseConfidenceScore,
        countryCode: result.countryCode,
        isp: result.isp,
        domain: result.domain || "N/A",
        totalReports: result.totalReports,
        lastReportedAt: result.lastReportedAt,
        lookedUpAt: new Date().toISOString(),
      };

      console.log("Saving to MongoDB:", iocPayload);
      await saveIocHistory(iocPayload);
      fetchHistory(); // refresh
    } catch (err) {
      console.error("Error during IOC lookup:", err);
      setError("Failed to fetch IOC details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ioc-lookup-container bg-slate-900 text-white p-4 rounded-xl shadow-xl">
      <h2 className="text-2xl mb-4">🔍 IOC Lookup</h2>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={ioc}
          onChange={(e) => setIoc(e.target.value)}
          placeholder="Enter IP Address"
        />
        <button type="submit">Lookup</button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {data && <IOCSeverityCard iocData={data} />}

      {history.length > 0 && (
        <div className="history-section mt-6 border-t border-slate-700 pt-4">
          <h4 className="text-lg font-semibold mb-2">🕓 Recent Lookups</h4>
          <ul>
            {history.map((item) => (
              <li
                key={item._id}
                className="cursor-pointer hover:underline"
                onClick={() => {
                  setData(item);
                  setIoc(item.ipAddress);
                }}
              >
                {item.ipAddress} ({item.lookedUpAt?.split("T")[0]})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IOCSearch;
