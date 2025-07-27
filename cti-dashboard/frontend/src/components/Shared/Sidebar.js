import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaSearch,
  FaMapMarkedAlt,
  FaBug,
  FaShieldAlt,
} from "react-icons/fa";
import "./Sidebar.css";
import { getUserFromToken } from "../../utils/auth";

function Sidebar() {
  const user = getUserFromToken(); // ✅ MOVE INSIDE
  const role = user?.role;

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>CyberX 🌐</h2>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              <FaTachometerAlt /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/lookup">
              <FaSearch /> IOC Lookup
            </NavLink>
          </li>
          <li>
            <NavLink to="/map">
              <FaMapMarkedAlt /> Threat Map
            </NavLink>
          </li>
          {role === "analyst" && (
            <li>
              <NavLink to="/incidents">
                <FaBug /> Incident Reporting
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/mitre">
              <FaShieldAlt /> MITRE Matrix
            </NavLink>
          </li>
        </ul>
        <div style={{ marginTop: "auto", padding: "1rem" }}>
          {user ? (
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
              style={{
                display: "block",
                background: "#f72585",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "15px",
                width: "100%",
                height: "40px",
                cursor: "pointer",
              }}
            >
              🔒 Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              style={{
                display: "block",
                background: "#4cc9f0",
                color: "white",
                padding: "10px 16px",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                textAlign: "center",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              🔐 Login
            </NavLink>
          )}
        </div>

        {user && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "1rem",
              borderTop: "1px solid #334155",
              marginTop: "auto",
              backgroundColor: "#1e293b",
              borderRadius: "0 0 10px 10px",
            }}
          >
            <img
              src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-qT0qCttwF0fSi4qeWZj6vo2Za76keg.png&w=1080&q=75"
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "0.75rem",
                border: "2px solid #4cc9f0",
              }}
            />
            <div>
              <div
                style={{ fontWeight: "bold", color: "white", fontSize: "15px" }}
              >
                {user.username}
              </div>
              <div style={{ color: "#94a3b8", fontSize: "13px" }}>
                {user.role === "admin" ? "System Admin" : "Security Analyst"}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;
