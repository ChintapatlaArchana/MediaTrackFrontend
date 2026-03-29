import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiShield, FiArrowLeft, FiRefreshCw, FiChevronDown, 
  FiLock, FiSmartphone, FiGlobe, FiClock, FiActivity
} from "react-icons/fi";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
  LineElement, ArcElement, Title, Tooltip, Legend, Filler 
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { operatorService } from "../../api/operatorService";
import { MediaTrackLogo } from "../../MediaTrackLogo";
import "../../styles/drm.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

const DRMPage = () => {
  const navigate = useNavigate();
  const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("All DRM Types");
  
  const [metrics, setMetrics] = useState({ granted: "0", denied: "0", expired: "0", successRate: "0%" });
  const [distribution, setDistribution] = useState({ Widevine: 0, FairPlay: 0, PlayReady: 0 });
  const [events, setEvents] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * HYDRATION LOGIC:
   * Instead of just calling getDRMActivity, we map through the results
   * and call the specific detail endpoints for each entity.
   */
  const fetchData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // 1. Fetch Summary Stats and the Base Event List
      const [granted, denied, expired, rate, distData, ] = await Promise.all([
        operatorService.getDRMGranted(),
        operatorService.getDRMDenied(),
        operatorService.getDRMExpired(),
        operatorService.getDRMSuccessRate(),
        operatorService.getDRMDistribution()

      ]);

     
      // 3. Update States
      setMetrics({
        granted: granted?.toLocaleString() || "0",
        denied: denied?.toLocaleString() || "0",
        expired: expired?.toLocaleString() || "0",
        successRate: rate ? `${Math.round(rate)}%` : "0%"
      });
      console.log()

      if (distData) {
        setDistribution({
          Widevine: Math.round(distData.Widevine || 0),
          FairPlay: Math.round(distData.FairPlay || 0),
          PlayReady: Math.round(distData.PlayReady || 0)
        });
      }

    } catch (err) {
      console.error("Critical DRM Data Fetch Error:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, [selectedType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Chart Configuration
  const lineData = {
    labels: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00'],
    datasets: [{
      label: 'License Requests',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: '#a371f7',
      backgroundColor: 'rgba(163, 113, 247, 0.2)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
    }]
  };

  return (
    <div className="drm-page-wrapper">
      <div className="top-right-logo-wrapper">
        <MediaTrackLogo size={36} gap={8} />
      </div>
      <div className="nav-container-top">
        <button onClick={() => navigate("/operator")} className="btn-back-link">
          <FiArrowLeft /> Back to Platform Dashboard
        </button>
      </div>

      <header className="drm-header-main">
        <div className="header-identity">
          <div className="header-icon-box"><FiShield size={28} color="#fff" /></div>
          <div className="header-titles">
            <h1>Security & DRM</h1>
            <p className="subtitle-text">License Management & Event Monitoring</p>
          </div>
        </div>
        <div className="header-actions">
           <button className="btn-refresh-alt" onClick={fetchData} disabled={isRefreshing}>
            <FiRefreshCw className={isRefreshing ? "spin-animation" : ""} />
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        
        </div>
      </header>

      {/* SUMMARY METRICS */}
      <section className="stats-grid-drm">
        <div className="stat-card border-granted">
          <span className="stat-value purple-text">{metrics.granted}</span>
          <span className="stat-label">Licenses Granted</span>
        </div>
        <div className="stat-card border-denied">
          <span className="stat-value red-text">{metrics.denied}</span>
          <span className="stat-label">Licenses Denied</span>
        </div>
        <div className="stat-card border-expired">
          <span className="stat-value orange-text">{metrics.expired}</span>
          <span className="stat-label">Licenses Expired</span>
        </div>
        <div className="stat-card border-neutral">
          <span className="stat-value white-text">{metrics.successRate}</span>
          <span className="stat-label">Success Rate</span>
        </div>
      </section>

      {/* CHARTS SECTION */}
      <section className="drm-charts-container">
        <div className="chart-card main-activity">
          <div className="chart-header">
            <h5 className="chart-title"><FiActivity className="me-2"/>License Activity (Last Hour)</h5>
          </div>
          <div className="chart-body">
            <Line data={lineData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } } }} />
          </div>
        </div>
        
        <div className="chart-card distribution-pie">
          <h5 className="chart-title">DRM Type Distribution</h5>
          <div className="pie-wrapper">
            <Doughnut 
              data={{
                labels: ['Widevine', 'FairPlay', 'PlayReady'],
                datasets: [{
                  data: [distribution.Widevine, distribution.FairPlay, distribution.PlayReady],
                  backgroundColor: ['#a371f7', '#f85149', '#ffa657'],
                  borderColor: '#12121e', borderWidth: 2
                }]
              }}
              options={{ cutout: '75%', plugins: { legend: { position: 'bottom', labels: { color: '#8b949e', usePointStyle: true, padding: 20 } } } }}
            />
          </div>
        </div>
      </section>
    </div>
      
   
      
  );
};

export default DRMPage;


  
        