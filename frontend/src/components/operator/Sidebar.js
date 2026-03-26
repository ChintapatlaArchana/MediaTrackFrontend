import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiLogOut } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <FaPlay size={14} color="white" />
        </div>
        <span>MediaTrack</span>
      </div>

      <div className="nav-menu">
        <Link 
          to="/operator" 
          className={`nav-item ${location.pathname === "/operator" ? "active" : ""}`}
        >
          <FiHome size={20} />
          <span>Home</span>
        </Link>
      </div>

      <div className="sidebar-footer">
        <button className="btn-operator-login">
          <FiLogOut size={20} />
          <span>Operator Login</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
