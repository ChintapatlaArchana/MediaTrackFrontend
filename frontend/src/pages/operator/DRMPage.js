// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { 
// //   FiShield, FiArrowLeft, FiRefreshCw, FiChevronDown, 
// //   FiLock, FiUser, FiSmartphone, FiGlobe, FiClock, FiActivity
// // } from "react-icons/fi";
// // import {
// //   Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
// //   LineElement, ArcElement, Title, Tooltip, Legend, Filler 
// // } from 'chart.js';
// // import { Line, Doughnut } from 'react-chartjs-2';
// // import { operatorService } from "../../api/operatorService";
// // import { MediaTrackLogo } from "../../components/MediaTrackLogo";
// // import "../../styles/drm.css";

// // ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

// // const DRMPage = () => {
// //   const navigate = useNavigate();
// //   const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false);
// //   const [selectedType, setSelectedType] = useState("All DRM Types");
// //   const [metrics, setMetrics] = useState({ granted: "1,284", denied: "42", expired: "156", successRate: "96.8%" });
// //   const [distribution, setDistribution] = useState({ Widevine: 65, FairPlay: 20, PlayReady: 15 });
// //   const [events, setEvents] = useState([]);
// //   const [isRefreshing, setIsRefreshing] = useState(false);

// //   const fetchData = async () => {
// //     setIsRefreshing(true);
// //     try {
// //       const evs = await operatorService.getDRMEvents();
// //       setEvents(Array.isArray(evs) ? evs : []);
// //     } catch (err) { console.error(err); } 
// //     finally { setIsRefreshing(false); }
// //   };

// //   useEffect(() => { fetchData(); }, []);

// //   const lineData = {
// //     labels: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00'],
// //     datasets: [{
// //       label: 'License Requests',
// //       data: [65, 59, 80, 81, 56, 55, 40],
// //       borderColor: '#a371f7',
// //       backgroundColor: (context) => {
// //         const ctx = context.chart.ctx;
// //         const gradient = ctx.createLinearGradient(0, 0, 0, 300);
// //         gradient.addColorStop(0, 'rgba(163, 113, 247, 0.4)');
// //         gradient.addColorStop(1, 'rgba(163, 113, 247, 0)');
// //         return gradient;
// //       },
// //       fill: true,
// //       tension: 0.4,
// //       pointRadius: 4,
// //       pointBackgroundColor: '#a371f7'
// //     }]
// //   };

// //   return (
// //     <div className="drm-page-wrapper">
// //       <div className="nav-container-top">
// //         <button onClick={() => navigate("/operator")} className="btn-back-link">
// //           <FiArrowLeft /> Back to Platform Dashboard
// //         </button>
// //       </div>

// //       <header className="drm-header-main">
// //         <div className="header-identity">
// //           <div className="header-icon-box">
// //             <FiShield size={28} color="#fff" />
// //           </div>
// //           <div className="header-titles">
// //             <h1>Security & DRM</h1>
// //             <p className="subtitle-text">License Management & Event Monitoring</p>
// //           </div>
// //         </div>
// //         <div className="header-actions">
// //            <button className="btn-refresh-alt" onClick={fetchData} disabled={isRefreshing}>
// //             <FiRefreshCw className={isRefreshing ? "spin-animation" : ""} />
// //             <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
// //           </button>
// //           <MediaTrackLogo />
// //         </div>
// //       </header>

// //       {/* SUMMARY METRICS - Matching Image 4 */}
// //       <section className="stats-grid-drm">
// //         <div className="stat-card border-granted">
// //           <span className="stat-value purple-text">{metrics.granted}</span>
// //           <span className="stat-label">Licenses Granted</span>
// //         </div>
// //         <div className="stat-card border-denied">
// //           <span className="stat-value red-text">{metrics.denied}</span>
// //           <span className="stat-label">Licenses Denied</span>
// //         </div>
// //         <div className="stat-card border-expired">
// //           <span className="stat-value orange-text">{metrics.expired}</span>
// //           <span className="stat-label">Licenses Expired</span>
// //         </div>
// //         <div className="stat-card border-neutral">
// //           <span className="stat-value white-text">{metrics.successRate}</span>
// //           <span className="stat-label">Success Rate</span>
// //         </div>
// //       </section>

// //       {/* CHARTS SECTION - Matching Image 4 & 5 */}
// //       <section className="drm-charts-container">
// //         <div className="chart-card main-activity">
// //           <div className="chart-header">
// //             <h5 className="chart-title"><FiActivity className="me-2"/>License Activity (Last Hour)</h5>
// //           </div>
// //           <div className="chart-body">
// //             <Line data={lineData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } } }} />
// //           </div>
// //         </div>
        
// //         <div className="chart-card distribution-pie">
// //           <h5 className="chart-title">DRM Type Distribution</h5>
// //           <div className="pie-wrapper">
// //             <Doughnut 
// //               data={{
// //                 labels: ['Widevine', 'FairPlay', 'PlayReady'],
// //                 datasets: [{
// //                   data: [distribution.Widevine, distribution.FairPlay, distribution.PlayReady],
// //                   backgroundColor: ['#a371f7', '#f85149', '#ffa657'],
// //                   borderColor: '#12121e', borderWidth: 2
// //                 }]
// //               }}
// //               options={{ cutout: '75%', plugins: { legend: { position: 'bottom', labels: { color: '#8b949e', usePointStyle: true, padding: 20 } } } }}
// //             />
// //           </div>
// //         </div>
// //       </section>

// //       {/* EVENT FEED - Matching Image 6 & 7 */}
// //       <section className="event-feed-section">
// //         <div className="feed-header">
// //           <h4 className="section-title">Live DRM Event Feed</h4>
// //           <div className="filter-dropdown-container">
// //             <button className="btn-filter-alt" onClick={() => setIsTypeFilterOpen(!isTypeFilterOpen)}>
// //               {selectedType} <FiChevronDown />
// //             </button>
// //             {isTypeFilterOpen && (
// //               <div className="filter-menu-popup">
// //                 {["All DRM Types", "Widevine", "FairPlay", "PlayReady"].map(t => (
// //                   <div key={t} className="filter-item-opt" onClick={() => { setSelectedType(t); setIsTypeFilterOpen(false); }}>{t}</div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         <div className="event-stack">
// //           {events.map((event, idx) => (
// //             <div key={idx} className="event-card">
// //               <div className="event-card-inner">
// //                 <div className="event-side-indicator">
// //                   <FiLock className={`icon-${event.status?.toLowerCase()}`} />
// //                 </div>
                
// //                 <div className="event-main-content">
// //                   <div className="event-meta-top">
// //                     <span className={`status-pill status-${event.status?.toLowerCase()}`}>{event.status}</span>
// //                     <span className="type-tag">{event.type}</span>
// //                     <span className="event-id">{event.id}</span>
// //                     <span className="event-time"><FiClock size={12}/> {event.time}</span>
// //                   </div>

// //                   <div className="event-details-grid">
// //                     <div className="detail-item">
// //                       <span className="detail-label">Content</span>
// //                       <span className="detail-value text-white">{event.title}</span>
// //                       <span className="detail-subtext"><FiGlobe size={10}/> {event.ip}</span>
// //                     </div>
// //                     <div className="detail-item">
// //                       <span className="detail-label">User</span>
// //                       <span className="detail-value text-purple">{event.user}</span>
// //                       <span className="detail-subtext">Asset ID: {event.asset}</span>
// //                     </div>
// //                     <div className="detail-item">
// //                       <span className="detail-label">Device</span>
// //                       <span className="detail-value text-white"><FiSmartphone size={12}/> {event.device}</span>
// //                     </div>
// //                     <div className="detail-item">
// //                       <span className="detail-label">Region</span>
// //                       <span className="detail-value text-white">{event.region}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default DRMPage;


// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   FiShield, FiArrowLeft, FiRefreshCw, FiChevronDown, 
//   FiLock, FiSmartphone, FiGlobe, FiClock, FiActivity
// } from "react-icons/fi";
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
//   LineElement, ArcElement, Title, Tooltip, Legend, Filler 
// } from 'chart.js';
// import { Line, Doughnut } from 'react-chartjs-2';
// import { operatorService } from "../../api/operatorService";
// import { MediaTrackLogo } from "../../components/MediaTrackLogo";
// import "../../styles/drm.css";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

// const DRMPage = () => {
//   const navigate = useNavigate();
//   const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false);
//   const [selectedType, setSelectedType] = useState("All DRM Types");
  
//   // States for dynamic data
//   const [metrics, setMetrics] = useState({ granted: "0", denied: "0", expired: "0", successRate: "0%" });
//   const [distribution, setDistribution] = useState({ Widevine: 0, FairPlay: 0, PlayReady: 0 });
//   const [events, setEvents] = useState([]);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const fetchData = useCallback(async () => {
//     setIsRefreshing(true);
//     try {
//       // 1. Fetch Summary Metrics & Distribution & Events in parallel
//       const [granted, denied, expired, rate, distData, evs] = await Promise.all([
//         operatorService.getDRMGranted(),
//         operatorService.getDRMDenied(),
//         operatorService.getDRMExpired(),
//         operatorService.getDRMSuccessRate(),
//         operatorService.getDRMDistribution(),
//         operatorService.getDRMActivity()
       
//       ]);

//       // 2. Update Metrics State
//       setMetrics({
//         granted: granted?.toString() || "0",
//         denied: denied?.toString() || "0",
//         expired: expired?.toString() || "0",
// successRate: rate ? `${Math.round(rate)}%` : "0%"      });

//       // 3. Update Distribution (Doughnut Chart)
      
    
//    if (distData) {
//   // Use Math.round to ensure no decimals are passed to the chart
//   setDistribution({
//     Widevine: Math.round(distData.Widevine || distData.widevine || 0),
//     FairPlay: Math.round(distData.FairPlay || distData.fairplay || 0),
//     PlayReady: Math.round(distData.PlayReady || distData.playready || 0)
//   });
// }

//       // 4. Update Event Feed
//       // setEvents(Array.isArray(evs) ? evs : []);
//       const filteredEvents = Array.isArray(evs) 
//       ? (selectedType === "All DRM Types" ? evs : evs.filter(e => e.type === selectedType))
//       : [];
    
//     setEvents(filteredEvents);

//     } catch (err) {
//       console.error("Error fetching DRM data:", err);
//     } finally {
//       setIsRefreshing(false);
//     }
//   }, [selectedType]);
//   useEffect(() => {
//   console.log("Current Events State:", events);
// }, [events]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

  
//   const lineData = {
//   labels: ['Granted', 'Denied', 'Expired'],
//   datasets: [{
//     label: 'License Status Count',
//     // Convert string numbers (e.g., "1,284") to actual numbers for the chart
//     data: [
//       parseInt(metrics.granted.replace(/,/g, '')) || 0, 
//       parseInt(metrics.denied.replace(/,/g, '')) || 0, 
//       parseInt(metrics.expired.replace(/,/g, '')) || 0
//     ],
//     borderColor: '#a371f7',
//     backgroundColor: 'rgba(163, 113, 247, 0.4)',
//     fill: true,
//     tension: 0.4,
//   }]
// };

//   return (
//     <div className="drm-page-wrapper">
//       <div className="nav-container-top">
//         <button onClick={() => navigate("/operator")} className="btn-back-link">
//           <FiArrowLeft /> Back to Platform Dashboard
//         </button>
//       </div>

//       <header className="drm-header-main">
//         <div className="header-identity">
//           <div className="header-icon-box"><FiShield size={28} color="#fff" /></div>
//           <div className="header-titles">
//             <h1>Security & DRM</h1>
//             <p className="subtitle-text">License Management & Event Monitoring</p>
//           </div>
//         </div>
//         <div className="header-actions">
//            <button className="btn-refresh-alt" onClick={fetchData} disabled={isRefreshing}>
//             <FiRefreshCw className={isRefreshing ? "spin-animation" : ""} />
//             <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
//           </button>
//           <MediaTrackLogo />
//         </div>
//       </header>

//       {/* SUMMARY METRICS */}
//       <section className="stats-grid-drm">
//         <div className="stat-card border-granted">
//           <span className="stat-value purple-text">{metrics.granted}</span>
//           <span className="stat-label">Licenses Granted</span>
//         </div>
//         <div className="stat-card border-denied">
//           <span className="stat-value red-text">{metrics.denied}</span>
//           <span className="stat-label">Licenses Denied</span>
//         </div>
//         <div className="stat-card border-expired">
//           <span className="stat-value orange-text">{metrics.expired}</span>
//           <span className="stat-label">Licenses Expired</span>
//         </div>
//         <div className="stat-card border-neutral">
//           <span className="stat-value white-text">{metrics.successRate}</span>
//           <span className="stat-label">Success Rate</span>
//         </div>
//       </section>

//       {/* CHARTS SECTION */}
//       <section className="drm-charts-container">
//         <div className="chart-card main-activity">
//           <div className="chart-header">
//             <h5 className="chart-title"><FiActivity className="me-2"/>License Activity (Last Hour)</h5>
//           </div>
//           <div className="chart-body">
//             <Line data={lineData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } } }} />
//           </div>
//         </div>
        
//         <div className="chart-card distribution-pie">
//           <h5 className="chart-title">DRM Type Distribution</h5>
//           <div className="pie-wrapper">
//             <Doughnut 
//               data={{
//                 labels: ['Widevine', 'FairPlay', 'PlayReady'],
//                 datasets: [{
//                   data: [distribution.Widevine, distribution.FairPlay, distribution.PlayReady],
//                   backgroundColor: ['#a371f7', '#f85149', '#ffa657'],
//                   borderColor: '#12121e', borderWidth: 2
//                 }]
//               }}
//               options={{ cutout: '75%', plugins: { legend: { position: 'bottom', labels: { color: '#8b949e', usePointStyle: true, padding: 20 } } } }}
//             />
//           </div>
//         </div>
//       </section>

//       {/* EVENT FEED */}
//       <section className="event-feed-section">
//   <div className="feed-header">
//     <h4 className="section-title">Live DRM Event Feed</h4>
//     <div className="filter-dropdown-container">
//       <button className="btn-filter-alt" onClick={() => setIsTypeFilterOpen(!isTypeFilterOpen)}>
//         {selectedType} <FiChevronDown />
//       </button>
//       {isTypeFilterOpen && (
//         <div className="filter-menu-popup">
//           {["All DRM Types", "Widevine", "FairPlay", "PlayReady"].map(t => (
//             <div key={t} className="filter-item-opt" onClick={() => { setSelectedType(t); setIsTypeFilterOpen(false); }}>{t}</div>
//           ))}
//         </div>
//       )}
//     </div>
//   </div>

//   <div className="event-stack">
//     {/* 1. Added a check to see if events is truly an array */}
//     {Array.isArray(events) && events.length > 0 ? (
//       events.map((event, idx) => (
//         <div key={event.id || idx} className="event-card">
//           <div className="event-card-inner">
//             <div className="event-side-indicator">
//               <FiLock className={`icon-${(event.status || 'neutral').toLowerCase()}`} />
//             </div>
            
//             <div className="event-main-content">
//               <div className="event-meta-top">
//                 <span className={`status-pill status-${(event.status || 'neutral').toLowerCase()}`}>
//                   {event.status || 'Unknown'}
//                 </span>
//                 <span className="type-tag">{event.type || 'N/A'}</span>
//                 <span className="event-id">#{event.id || idx}</span>
//                 <span className="event-time"><FiClock size={12}/> {event.time || 'recent'}</span>
//               </div>

//               <div className="event-details-grid">
//                 <div className="detail-item">
//                   <span className="detail-label">Content</span>
//                   {/* Check for 'title' or 'content' depending on your API */}
//                   <span className="detail-value text-white">{event.title || event.content || 'Untitled'}</span>
//                   <span className="detail-subtext"><FiGlobe size={10}/> {event.ip || '0.0.0.0'}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">User</span>
//                   <span className="detail-value text-purple">{event.user || 'Anonymous'}</span>
//                   <span className="detail-subtext">Asset ID: {event.asset || '---'}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Device</span>
//                   <span className="detail-value text-white">
//                     <FiSmartphone size={12}/> {event.device || 'Unknown'}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Region</span>
//                   <span className="detail-value text-white">{event.region || 'Global'}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))
//     ) : (
//       <div className="empty-feed-msg" style={{padding: '2rem', textAlign: 'center', color: '#8b949e'}}>
//         {isRefreshing ? "Loading events..." : `No live events found for ${selectedType}.`}
//       </div>
//     )}
//   </div>
// </section>
// </div>
// );
// };
// export default DRMPage;


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
import { MediaTrackLogo } from "../../components/MediaTrackLogo";
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
          <MediaTrackLogo />
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


  
        