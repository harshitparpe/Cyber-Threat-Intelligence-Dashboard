import React, { useState } from "react";
import axios from "axios";

const IncidentForm = ({ onIncidentCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "Low",
    status: "Open",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/incidents",
        formData
      );
      onIncidentCreated(res.data);
      setFormData({
        title: "",
        description: "",
        severity: "Low",
        status: "Open",
      });
    } catch (err) {
      console.error("Error creating incident", err);
    }
  };

  return (
    <form className="incident-form" onSubmit={handleSubmit}>
      <h3>Report New Incident</h3>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Incident Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
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
