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

function Sidebar() {
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
          <li>
            <NavLink to="/incidents">
              <FaBug /> Incidents
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings">
              <FaCog /> Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
