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
                // padding: "10px 16px",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                textAlign: "center",
                textDecoration: "none",
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
      </nav>
    </div>
  );
}

export default Sidebar;
