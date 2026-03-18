import React from "react";
import {
  FiZap,
  FiCheckCircle,
  FiGlobe,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";
import {
  HiOutlineDatabase,
  HiOutlineBadgeCheck,
} from "react-icons/hi";
import "../../styles/operator.css";

const PlatformOperation = () => {
  return (
    <div className="platform-container">

      {/* HEADER */}
      <div className="platform-header">
        <div className="header-left">
          <div className="title-icon">
            <FiZap />
          </div>
          <div>
            <h1>Platform Operations</h1>
            <p>High‑Scale OTT Delivery System Monitoring</p>
          </div>
        </div>

        <div className="header-right">
          <span className="time">13:47:34</span>
          <span className="live">● Live</span>
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="platform-cards">

        <div className="platform-card">
          <div className="card-header">
            <div className="card-icon"><FiZap /></div>
            <FiArrowRight className="arrow" />
          </div>
          <h3>Ingest & Transcode</h3>
          <p>Monitor pipeline queue and job status</p>
          <div className="badge-row">
            <span>active: 2</span>
            <span>queued: 2</span>
            <span>completed: 3</span>
          </div>
        </div>

        <div className="platform-card">
          <div className="card-header">
            <div className="card-icon"><FiCheckCircle /></div>
            <FiArrowRight className="arrow" />
          </div>
          <h3>Packaging & QC</h3>
          <p>Quality control and format packaging</p>
          <div className="badge-row">
            <span>passed: 4</span>
            <span>failed: 2</span>
            <span>pending: 2</span>
          </div>
        </div>

        <div className="platform-card">
          <div className="card-header">
            <div className="card-icon"><FiGlobe /></div>
            <FiArrowRight className="arrow" />
          </div>
          <h3>CDN Infrastructure</h3>
          <p>Network health and global delivery</p>
          <div className="badge-row">
            <span>active: 5</span>
            <span>total: 6</span>
            <span>throughput: 7.2 Gbps</span>
          </div>
        </div>

        <div className="platform-card">
          <div className="card-header">
            <div className="card-icon"><FiShield /></div>
            <FiArrowRight className="arrow" />
          </div>
          <h3>Security & DRM</h3>
          <p>License management and event monitoring</p>
          <div className="badge-row">
            <span>granted: 6</span>
            <span>denied: 3</span>
            <span>rate: 67%</span>
          </div>
        </div>

      </div>

      {/* SYSTEM HEALTH */}
      <div className="health-section">
        <h2>System Health Overview</h2>

        <div className="health-cards">

          <div className="health-card">
            <div className="health-icon"><HiOutlineDatabase /></div>
            <p>Ingest Pipeline</p>
            <h3>87%</h3>
          </div>

          <div className="health-card">
            <div className="health-icon purple"><FiGlobe /></div>
            <p>CDN Availability</p>
            <h3>99.9%</h3>
          </div>

          <div className="health-card danger">
            <div className="health-icon yellow"><HiOutlineBadgeCheck /></div>
            <p>QC Pass Rate</p>
            <h3>50%</h3>
          </div>

          <div className="health-card">
            <div className="health-icon purple"><FiShield /></div>
            <p>DRM Success</p>
            <h3>67%</h3>
          </div>

        </div>
      </div>

    </div>
  );
};

export default PlatformOperation;