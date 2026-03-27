
import React, { useState, useEffect } from "react"; // Added hooks
import { Button, ListGroup } from "react-bootstrap";
import {
  FiCheckCircle,
  FiUpload,
  FiStar,
} from "react-icons/fi";
import { BsFilm } from "react-icons/bs";
import { getStatusCounts } from "../../services/contentService"; // Import the new function

const navItems = [
  {
    id: "action-cards",
    icon: <FiUpload />,
    label: "Quick Actions",
   // sub: "3 items",
  },
  {
    id: "qc-overview",
    icon: <FiCheckCircle />,
    label: "QC Status Overview",
    //sub: "187 items",
  },
  // {
  //   id: "recent-uploads",
  //   icon: <FiUpload />,
  //   label: "Recent Uploads",
  //   //sub: "5 items",
  // },
  {
    id: "quick-edit",
    icon: <BsFilm />,
    label: "Quick Metadata Edit",
    sub: null,
    isQuickEdit: true,
  },
];

const Sidebar = ({ activeSection, onNavClick }) => {
  // 1. Keep your initial state keys consistent
  const [liveStats, setLiveStats] = useState({
    AVAILABLE: 0,
    COMING_SOON: 0,
    EXPIRED: 0
  });

  // 2. Fetch and Normalize Data
  useEffect(() => {
    getStatusCounts()
      .then(data => {
        // We look for both uppercase AND lowercase variations of the keys
        const normalized = {
          AVAILABLE: data?.AVAILABLE ?? data?.available ?? 0,
          COMING_SOON: data?.COMING_SOON ?? data?.coming_soon ?? data?.["COMING SOON"] ?? 0,
          EXPIRED: data?.EXPIRED ?? data?.expired ?? 0
        };
        
        setLiveStats(normalized);
      })
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  // 3. This section remains the same, but now it's guaranteed to find values
  const statItems = [
    {
      label: "Available",
      count: liveStats.AVAILABLE, 
      dotClass: "ce-dot-purple",
      badgeClass: "ce-stat-badge-purple",
    },
    {
      label: "Coming Soon",
      count: liveStats.COMING_SOON,
      dotClass: "ce-dot-amber",
      badgeClass: "ce-stat-badge-amber",
    },
    {
      label: "Expired",
      count: liveStats.EXPIRED,
      dotClass: "ce-dot-red",
      badgeClass: "ce-stat-badge-red",
    },
  ];

 
  return (
    <aside className="ce-sidebar">
      {/* ---- Jump to section label ---- */}
      <p className="ce-sidebar-section-label">Jump to any section</p>

      {/* ---- Nav links ---- */}
      <nav className="d-flex flex-column gap-1">
        {navItems.map((item) =>
          item.isQuickEdit ? (
            <Button
              key={item.id}
              className={`ce-quick-edit-btn ${activeSection === item.id ? "active" : ""}`}
              onClick={() => onNavClick(item.id)}
            >
              <FiStar size={14} />
              Quick Metadata Edit
            </Button>
          ) : (
            <div
              key={item.id}
              className={`ce-nav-link ${activeSection === item.id ? "active" : ""}`}
              onClick={() => onNavClick(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">
                <strong>{item.label}</strong>
                {item.sub && <small>{item.sub}</small>}
              </span>
            </div>
          )
        )}
      </nav>

      {/* ---- Upload Stats ---- */}
      <p className="ce-upload-stats-label">Upload Stats</p>
      <ListGroup variant="flush">
        {statItems.map((s) => (
          <ListGroup.Item
            key={s.label}
            className="ce-stat-item bg-transparent border-0 p-0"
          >
            <span className="ce-stat-left">
              <span className={`ce-dot ${s.dotClass}`} />
              {s.label}
            </span>
            <span className={`ce-stat-badge ${s.badgeClass}`}>{s.count}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </aside>
  );
};

export default Sidebar;