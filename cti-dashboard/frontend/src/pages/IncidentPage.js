import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
    color: "#fff",
    backgroundColor: "#0e1628",
    minHeight: "100vh",
  },
  form: {
    backgroundColor: "#1a233a",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "500px",
  },
  list: {
    backgroundColor: "#1a233a",
    padding: "20px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "500px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#0e1b2c",
    color: "#fff",
  },
  select: {
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#0e1b2c",
    color: "#fff",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  card: {
    backgroundColor: "#11192e",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  cardHover: {
    backgroundColor: "#1d2947",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#202b40",
    padding: "30px",
    borderRadius: "10px",
    color: "#fff",
    width: "400px",
    boxShadow: "0 0 20px rgba(0,0,0,0.8)",
  },
};

const IncidentPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "Low",
    status: "Open",
  });

  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchIncidents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/incidents");
      setIncidents(res.data);
    } catch (err) {
      console.error("Failed to fetch incidents", err);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/incidents", formData);
      toast.success("🚀 Incident submitted!");
      fetchIncidents();
      setFormData({
        title: "",
        description: "",
        severity: "Low",
        status: "Open",
      });
    } catch (err) {
      toast.error("❌ Failed to submit incident.");
      console.error("Error creating incident", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h3 style={{ marginBottom: "10px" }}>📝 Report New Incident</h3>
        <input
          style={styles.input}
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          style={styles.input}
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <select
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          style={styles.select}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={styles.select}
        >
          <option>Open</option>
          <option>Investigating</option>
          <option>Resolved</option>
        </select>
        <button type="submit" style={styles.button} disabled={submitting}>
          {submitting ? "Submitting..." : "➕ Submit"}
        </button>
      </form>

      <div style={styles.list}>
        <h3>📋 Incident List</h3>
        {incidents.map((incident) => (
          <div
            key={incident._id}
            style={styles.card}
            onClick={() => setSelectedIncident(incident)}
          >
            <strong>{incident.title}</strong> — {incident.severity} —{" "}
            {incident.status}
          </div>
        ))}
      </div>

      {selectedIncident && (
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedIncident(null)}
        >
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedIncident.title}</h2>
            <p>
              <strong>Description:</strong> {selectedIncident.description}
            </p>
            <p>
              <strong>Severity:</strong> {selectedIncident.severity}
            </p>
            <p>
              <strong>Status:</strong> {selectedIncident.status}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {new Date(selectedIncident.created_at).toLocaleString()}
            </p>
            <button
              style={{
                ...styles.button,
                marginTop: "10px",
                backgroundColor: "#dc3545",
              }}
              onClick={() => setSelectedIncident(null)}
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

export default IncidentPage;
