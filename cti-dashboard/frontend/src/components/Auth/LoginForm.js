import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (err) {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="login-form-container" style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>🔐 Login</h2>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          ✅ Login
        </button>

        <p style={{ marginTop: "10px", color: "#ccc" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#0e1628",
    color: "#fff",
  },
  form: {
    backgroundColor: "#1a233a",
    padding: "30px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "300px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#0e1b2c",
    border: "1px solid #ccc",
    color: "#fff",
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  link: {
    color: "#00c8ff",
    textDecoration: "underline",
    fontWeight: "bold",
  },
  error: {
    color: "#ff4c4c",
    fontSize: "14px",
    marginTop: "-5px",
  },
};

export default LoginForm;
