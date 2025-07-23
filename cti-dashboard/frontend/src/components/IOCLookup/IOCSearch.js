import React, { useState, useEffect } from "react";
import IOCSeverityCard from "./IOCSeverityCard";
import { saveIocHistory } from "../../services/iocService";
import "./IOCSearch.css";

const IOCSearch = () => {
  const [iocInput, setIocInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("ioc_history");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const handleSearch = async () => {
    if (!iocInput.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      await new Promise((res) => setTimeout(res, 1000));
      const mockResponse = {
        ioc: iocInput,
        type: "IP Address",
        severity: ["LOW", "MEDIUM", "HIGH"][Math.floor(Math.random() * 3)],
        source: "VirusTotal",
        last_seen: new Date().toISOString(),
      };
      setResult(mockResponse);

      // Update local history
      const updatedHistory = [mockResponse, ...history].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem("ioc_history", JSON.stringify(updatedHistory));

      // Store to DB
      await saveIocHistory(mockResponse);
    } catch (err) {
      setError("Something went wrong while fetching IOC data.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
  };

  const exportToJSON = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.ioc}_ioc_data.json`;
    a.click();
  };

  return (
    <div className="ioc-lookup-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter IP, domain, or hash..."
          value={iocInput}
          onChange={(e) => setIocInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <div className="loading">🔍 Searching...</div>}
      {error && <div className="error">{error}</div>}

      {result && (
        <div className="result-card">
          <IOCSeverityCard iocData={result} />
          <div className="result-actions">
            <button className="copy-btn" onClick={copyToClipboard}>
              📋 Copy
            </button>
            <button className="export-btn" onClick={exportToJSON}>
              💾 Export
            </button>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="history-section">
          <h4>🕓 Recent History</h4>
          <ul>
            {history.map((entry, idx) => (
              <li key={idx}>
                {entry.ioc} —{" "}
                <span className={`sev ${entry.severity.toLowerCase()}`}>
                  {entry.severity}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IOCSearch;
