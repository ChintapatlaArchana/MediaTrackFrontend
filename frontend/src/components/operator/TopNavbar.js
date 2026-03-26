import React from "react";
import { FiBell } from "react-icons/fi";

const TopNavbar = () => {
  return (
    <div className="top-navbar">
      <h2>Platform Operator</h2>
      
      <div className="navbar-right">
        <div className="notification-icon">
          <FiBell size={24} />
          <span className="badge-count">2</span>
        </div>
        <div className="profile-placeholder" style={{ width: 32, height: 32, borderRadius: '50%', background: '#30363d', display: 'flex', alignItems: 'center', justifycenter: 'center' }}>
          {/* Profile image placeholder */}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
