import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaSearch,
  FaMapMarkedAlt,
  FaBug,
  FaCog,
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
            <NavLink to="/settings">
              <FaCog /> Settings
            </NavLink>
          </li>
        </ul>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          style={{ marginTop: "20px", background: "#dc3545", color: "#fff" }}
        >
          🔒 Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
