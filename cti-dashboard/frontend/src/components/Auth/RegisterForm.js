import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "viewer",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setMessage("✅ Registration successful! You can now login.");
    } catch {
      setMessage("⚠️ Registration failed.");
    }
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>📝 Register</h2>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />

        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <select name="role" onChange={handleChange}>
          <option value="viewer">Viewer</option>
          <option value="analyst">Analyst</option>
        </select>
        <button type="submit">Register</button>
        {message && (
          <div className="auth-message">
            {message}
            {message.includes("successful") && (
              <p className="mt-2 text-sm">
                👉{" "}
                <a
                  href="/login"
                  style={{ color: "#4cc9f0", textDecoration: "underline" }}
                >
                  Go to Login
                </a>
              </p>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
