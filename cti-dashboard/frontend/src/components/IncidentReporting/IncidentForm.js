import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../../utils/auth";

const IncidentForm = ({ onIncidentCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "Low",
    status: "Open",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/incidents",
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      onIncidentCreated(res.data);
      setFormData({
        title: "",
        description: "",
        severity: "Low",
        status: "Open",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit incident.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="incident-form">
      <h3>Report Incident</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="title"
        placeholder="Incident Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Incident Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <select name="severity" value={formData.severity} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select name="status" value={formData.status} onChange={handleChange}>
        <option>Open</option>
        <option>Investigating</option>
        <option>Resolved</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default IncidentForm;
