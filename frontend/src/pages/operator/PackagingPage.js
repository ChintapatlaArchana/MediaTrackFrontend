// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { 
// //   FiCheckCircle, FiXCircle, FiClock, FiChevronDown,
// //   FiPackage, FiArrowLeft, FiRefreshCw, FiPieChart, FiBarChart2 
// // } from "react-icons/fi";
// // import { 
// //   Chart as ChartJS, ArcElement, Tooltip, Legend, 
// //   CategoryScale, LinearScale, BarElement 
// // } from 'chart.js';
// // import { Doughnut, Bar } from 'react-chartjs-2';
// // import { operatorService } from "../../api/operatorService";
// // import { MediaTrackLogo } from "../../components/MediaTrackLogo";
// // import "../../styles/packaging.css";

// // ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// // const StatusIcon = ({ status }) => {
// //   const s = status?.toLowerCase();
// //   if (s === 'passed') return <FiCheckCircle size={16} />;
// //   if (s === 'failed') return <FiXCircle size={16} />;
// //   return <FiClock size={16} />;
// // };

// // const PackagingPage = () => {
// //   const navigate = useNavigate();
// //   const [formatDist, setFormatDist] = useState({ HLS: 0, DASH: 0, MSS: 0 });
// //   const [statusDist, setStatusDist] = useState({ passed: 0, failed: 0, pending: 0, passRate: "0%" });
// //   const [qcItems, setQcItems] = useState([]);
// //   const [isRefreshing, setIsRefreshing] = useState(false);
// //   const [selectedFilter, setSelectedFilter] = useState("All QC Status");
// //   const [isFilterOpen, setIsFilterOpen] = useState(false);

// //   const fetchData = async () => {
// //   setIsRefreshing(true);
// //   try {
// //     // Use allSettled so the whole page doesn't break if one API fails
// //     const [resF, resS, resQ] = await Promise.allSettled([
// //       operatorService.getMediaFormatDistribution(), 
// //       operatorService.getMediaStatusDistribution(),
// //       operatorService.getPackagingJobs()
// //     ]);
   

// //     // Update Format Dist if successful
// //     if (resF.status === 'fulfilled' && resF.value) setFormatDist(resF.value);
    
// //     // Update Status Dist if successful
// //     if (resS.status === 'fulfilled' && resS.value) setStatusDist(resS.value);
    
// //     // Update Jobs list if successful
// //     if (resQ.status === 'fulfilled' && resQ.value) {
// //       const data = resQ.value;
// //       setQcItems(Array.isArray(data) ? data : (data.jobs || []));
// //     } else {
// //       console.error("Jobs API 400 Error:", resQ.reason);
// //       setQcItems([]); // Clear the "random" data on failure
// //     }

// //   } catch (e) { 
// //     console.error("Critical Fetch Error", e); 
// //   } finally { 
// //     setIsRefreshing(false); 
// //   }
// // };
// //   useEffect(() => { fetchData(); }, []);

// //   const filteredItems = qcItems.filter(item => {
// //     if (selectedFilter === "All QC Status") return true;
// //     return item.status === selectedFilter;
// //   });

// //   return (
// //     <div className="packaging-page-wrapper">
// //       {/* NAVIGATION */}
// //       <div className="nav-header-packaging">
// //         <button onClick={() => navigate("/operator")} className="btn-back-link">
// //           <FiArrowLeft /> Back to Platform Dashboard
// //         </button>
// //       </div>

// //       {/* HEADER SECTION - Image 4/5 */}
// //       <header className="packaging-main-header">
// //         <div className="header-left-content">
// //           <div className="header-icon-container">
// //             <FiPackage size={28} color="white" />
// //           </div>
// //           <div className="header-text-stack">
// //             <h1>Packaging & Quality Control</h1>
// //             <p>Format Packaging & QC Validation</p>
// //           </div>
// //         </div>
// //         <div className="header-right-actions">
// //           <button className="btn-refresh-system" onClick={fetchData} disabled={isRefreshing}>
// //             <FiRefreshCw className={isRefreshing ? "spin" : ""} /> Refresh System
// //           </button>
// //           <MediaTrackLogo size={28} />
// //         </div>
// //       </header>

// //       {/* STATS GRID - Image 5 */}
// //       <section className="packaging-stats-grid">
// //         <div className="p-stat-card border-purple">
// //           <span className="p-stat-number purple-txt">{statusDist.passed}</span>
// //           <span className="p-stat-label">QC Passed</span>
// //         </div>
// //         <div className="p-stat-card border-red">
// //           <span className="p-stat-number red-txt">{statusDist.failed}</span>
// //           <span className="p-stat-label">QC Failed</span>
// //         </div>
// //         <div className="p-stat-card border-orange">
// //           <span className="p-stat-number orange-txt">{statusDist.pending}</span>
// //           <span className="p-stat-label">Pending QC</span>
// //         </div>
// //         <div className="p-stat-card border-white">
// //           <span className="p-stat-number white-txt">{statusDist.passRate}</span>
// //           <span className="p-stat-label">Pass Rate</span>
// //         </div>
// //       </section>

// //       {/* CHARTS SECTION - Image 6 */}
// //       <section className="packaging-charts-section">
// //         <div className="p-chart-card">
// //           <div className="p-chart-header">
// //             <h5><FiPieChart className="icon-gap" /> QC Status Distribution</h5>
// //           </div>
// //           <div className="p-chart-box">
// //             <Doughnut 
// //               data={{
// //                 labels: ['Passed', 'Failed', 'Pending'],
// //                 datasets: [{
// //                   data: [statusDist.passed, statusDist.failed, statusDist.pending],
// //                   backgroundColor: ['#a371f7', '#ef4444', '#f59e0b'],
// //                   borderColor: '#12121e', borderWidth: 2,
// //                 }]
// //               }}
// //               options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#8b949e', boxWidth: 12 } } }, cutout: '75%' }} 
// //             />
// //           </div>
// //         </div>
// //         <div className="p-chart-card">
// //           <div className="p-chart-header">
// //             <h5><FiBarChart2 className="icon-gap" /> Format Distribution</h5>
// //           </div>
// //           <div className="p-chart-box">
// //             <Bar 
// //               data={{
// //                 labels: ['HLS', 'DASH', 'MSS'],
// //                 datasets: [{ data: [formatDist.HLS, formatDist.DASH, formatDist.MSS], backgroundColor: '#c9b3f9', borderRadius: 5, barThickness: 20 }]
// //               }}
// //               options={{ indexAxis: 'y', maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: '#1a1a2e' }, ticks: { color: '#8b949e' } }, y: { grid: { display: false }, ticks: { color: '#8b949e' } } } }}
// //             />
// //           </div>
// //         </div>
// //       </section>

// //       {/* VALIDATION QUEUE - Image 7 & 8 */}
// //       <section className="validation-queue-container">
// //         <div className="queue-header-flex">
// //           <h2>Validation Queue</h2>
// //           <div className="dropdown-wrapper">
// //             <button className="btn-filter-dropdown" onClick={() => setIsFilterOpen(!isFilterOpen)}>
// //               {selectedFilter} <FiChevronDown />
// //             </button>
// //             {isFilterOpen && (
// //               <ul className="dropdown-menu-list">
// //                 {["All QC Status", "Passed", "Failed", "Pending"].map(opt => (
// //                   <li key={opt} onClick={() => { setSelectedFilter(opt); setIsFilterOpen(false); }}>{opt}</li>
// //                 ))}
// //               </ul>
// //             )}
// //           </div>
// //         </div>

// //         <div className="qc-items-grid">
// //           {filteredItems.map((item, idx) => (
// //             <div key={idx} className="qc-main-card">
// //               <div className="qc-card-body">
// //                 <div className="qc-row-header">
// //                   <div className="qc-identity">
// //                     <div className="qc-icon-box"><FiPackage size={22} /></div>
// //                     <div className="qc-titles">
// //                       <span className="qc-main-title">{item.title}</span>
// //                       <span className="qc-sub-id">{item.packageId}</span>
// //                     </div>
// //                   </div>
// //                   <div className={`qc-status-pill pill-${item.status?.toLowerCase()}`}>
// //                     <StatusIcon status={item.status} /> {item.status}
// //                   </div>
// //                 </div>

// //                 <div className="qc-specs-grid">
// //                   <div className="spec-col">
// //                     <span className="spec-label">Streaming Formats</span>
// //                     <div className="pill-group">
// //                       {item.formats?.map(f => <span key={f} className="spec-pill">{f}</span>)}
// //                     </div>
// //                   </div>
// //                   <div className="spec-col">
// //                     <span className="spec-label">DRM Protection</span>
// //                     <div className="pill-group">
// //                       {item.drm?.map(d => <span key={d} className="spec-pill">{d}</span>)}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
              
// //               {/* NOTE BANNER - Image 8 */}
// //               <div className={`qc-card-banner banner-${item.status?.toLowerCase()}`}>
// //                  <StatusIcon status={item.status} />
// //                  <span>{item.notes || "Validation complete. No issues found."}</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default PackagingPage;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   FiCheckCircle, FiXCircle, FiClock, FiChevronDown,
//   FiPackage, FiArrowLeft, FiRefreshCw, FiPieChart, FiBarChart2, FiActivity 
// } from "react-icons/fi";
// import { 
//   Chart as ChartJS, ArcElement, Tooltip, Legend, 
//   CategoryScale, LinearScale, BarElement 
// } from 'chart.js';
// import { Doughnut, Bar } from 'react-chartjs-2';
// import { operatorService } from "../../api/operatorService";
// import { MediaTrackLogo } from "../../components/MediaTrackLogo";
// import "../../styles/packaging.css";

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// const StatusIcon = ({ status }) => {
//   const s = status?.toLowerCase();
//   if (s === 'passed') return <FiCheckCircle size={16} />;
//   if (s === 'failed') return <FiXCircle size={16} />;
//   return <FiClock size={16} />;
// };

// const PackagingPage = () => {
//   const navigate = useNavigate();
//   const [formatDist, setFormatDist] = useState({ HLS: 0, DASH: 0, MSS: 0 });
//   const [statusDist, setStatusDist] = useState({ passed: 0, failed: 0, pending: 0, passRate: "0%" });
//   const [qcItems, setQcItems] = useState([]);
//   const [healthScore, setHealthScore] = useState(null); // New state for health
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState("All QC Status");
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const fetchData = async () => {
//   setIsRefreshing(true);
//   try {
//     const results = await Promise.allSettled([
//       operatorService.getMediaFormatDistribution(), 
//       operatorService.getMediaStatusDistribution(),
//       operatorService.getPackagingJobs(),
//       operatorService.getPackagingHealth(),
//       operatorService.getPackagingMetrics()
//     ]);

//     const [resF, resS, resQ, resHealth, resMetrics] = results;

//     if (resQ.status === 'fulfilled' && resQ.value) {
//     console.log("Data in State:", resQ.value); // LOOK AT THIS IN THE CONSOLE
//     setQcItems(resQ.value);
// }

//     // 1. Update Charts & Stats (Only if successful)
//     if (resF.status === 'fulfilled') setFormatDist(resF.value);
//     if (resS.status === 'fulfilled') setStatusDist(prev => ({ ...prev, ...resS.value }));
//     if (resHealth.status === 'fulfilled') setHealthScore(resHealth.value.score);

//     // 2. Handle the Jobs Queue (The part hitting 401)
//     if (resQ.status === 'fulfilled' && resQ.value) {
//       const data = resQ.value;
//       // Extract the array regardless of how the backend wraps it
//       const rawJobs = Array.isArray(data) ? data : (data.jobs || data.data || []);
      
//       // CRITICAL: Ensure 'formats' and 'drm' are always arrays so .map() doesn't fail
//       const cleanJobs = rawJobs.map(item => ({
//         // Map backend keys to your frontend keys if they differ
//         title: item.title || item.assetName || "Unknown Title",
//         packageId: item.packageId || item.id || "N/A",
//         status: item.status || "Pending",
//         formats: Array.isArray(item.formats) ? item.formats : [],
//         drm: Array.isArray(item.drm) ? item.drm : [],
//         notes: item.notes || item.message || ""
//       }));
      
//       setQcItems(cleanJobs);
//     } else {
//       console.error("Jobs Queue failed with 401. Check your Auth Token.");
//       setQcItems([]); // Clear list on failure
//     }
//   } catch (e) {
//     console.error("Critical Fetch Error:", e);
//   } finally {
//     setIsRefreshing(false);
//   }
// };
//   useEffect(() => { fetchData(); }, []);

//   const filteredItems = qcItems.filter(item => {
//     if (selectedFilter === "All QC Status") return true;
//     return item.status === selectedFilter;
//   });

//   return (
//     <div className="packaging-page-wrapper">
//       <div className="nav-header-packaging">
//         <button onClick={() => navigate("/operator")} className="btn-back-link">
//           <FiArrowLeft /> Back to Platform Dashboard
//         </button>
//       </div>

//       <header className="packaging-main-header">
//         <div className="header-left-content">
//           <div className="header-icon-container">
//             <FiPackage size={28} color="white" />
//           </div>
//           <div className="header-text-stack">
//             <h1>Packaging & Quality Control</h1>
//             <p>Format Packaging & QC Validation</p>
//           </div>
//         </div>

//         {/* Displaying Health Metric in Header */}
//         {healthScore !== null && (
//           <div className="header-health-indicator">
//             <FiActivity className="icon-gap" />
//             <span>System Health: <strong>{healthScore}%</strong></span>
//           </div>
//         )}

//         <div className="header-right-actions">
//           <button className="btn-refresh-system" onClick={fetchData} disabled={isRefreshing}>
//             <FiRefreshCw className={isRefreshing ? "spin" : ""} /> Refresh System
//           </button>
//           <MediaTrackLogo size={28} />
//         </div>
//       </header>

//       <section className="packaging-stats-grid">
//         <div className="p-stat-card border-purple">
//           <span className="p-stat-number purple-txt">{statusDist.passed}</span>
//           <span className="p-stat-label">QC Passed</span>
//         </div>
//         <div className="p-stat-card border-red">
//           <span className="p-stat-number red-txt">{statusDist.failed}</span>
//           <span className="p-stat-label">QC Failed</span>
//         </div>
//         <div className="p-stat-card border-orange">
//           <span className="p-stat-number orange-txt">{statusDist.pending}</span>
//           <span className="p-stat-label">Pending QC</span>
//         </div>
//         <div className="p-stat-card border-white">
//           <span className="p-stat-number white-txt">{statusDist.passRate}</span>
//           <span className="p-stat-label">Pass Rate</span>
//         </div>
//       </section>

//       <section className="packaging-charts-section">
//         <div className="p-chart-card">
//           <div className="p-chart-header">
//             <h5><FiPieChart className="icon-gap" /> QC Status Distribution</h5>
//           </div>
//           <div className="p-chart-box">
//             <Doughnut 
//               data={{
//                 labels: ['Passed', 'Failed', 'Pending'],
//                 datasets: [{
//                   data: [statusDist.passed, statusDist.failed, statusDist.pending],
//                   backgroundColor: ['#a371f7', '#ef4444', '#f59e0b'],
//                   borderColor: '#12121e', borderWidth: 2,
//                 }]
//               }}
//               options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#8b949e', boxWidth: 12 } } }, cutout: '75%' }} 
//             />
//           </div>
//         </div>
//         <div className="p-chart-card">
//           <div className="p-chart-header">
//             <h5><FiBarChart2 className="icon-gap" /> Format Distribution</h5>
//           </div>
//           <div className="p-chart-box">
//             <Bar 
//               data={{
//                 labels: ['HLS', 'DASH', 'MSS'],
//                 datasets: [{ data: [formatDist.HLS, formatDist.DASH, formatDist.MSS], backgroundColor: '#c9b3f9', borderRadius: 5, barThickness: 20 }]
//               }}
//               options={{ indexAxis: 'y', maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: '#1a1a2e' }, ticks: { color: '#8b949e' } }, y: { grid: { display: false }, ticks: { color: '#8b949e' } } } }}
//             />
//           </div>
//         </div>
//       </section>

//       <section className="validation-queue-container">
//         <div className="queue-header-flex">
//           <h2>Validation Queue ({filteredItems.length})</h2>
//           <div className="dropdown-wrapper">
//             <button className="btn-filter-dropdown" onClick={() => setIsFilterOpen(!isFilterOpen)}>
//               {selectedFilter} <FiChevronDown />
//             </button>
//             {isFilterOpen && (
//               <ul className="dropdown-menu-list">
//                 {["All QC Status", "Passed", "Failed", "Pending"].map(opt => (
//                   <li key={opt} onClick={() => { setSelectedFilter(opt); setIsFilterOpen(false); }}>{opt}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>

//         <div className="qc-items-grid">
//           {filteredItems.map((item, idx) => (
//             <div key={idx} className="qc-main-card">
//               <div className="qc-card-body">
//                 <div className="qc-row-header">
//                   <div className="qc-identity">
//                     <div className="qc-icon-box"><FiPackage size={22} /></div>
//                     <div className="qc-titles">
//                       <span className="qc-main-title">{item.title || item.name || item.assetName || "Unknown Title"}</span>
//                       <span className="qc-sub-id">{item.packageId}</span>
//                     </div>
//                   </div>
//                   <div className={`qc-status-pill pill-${item.status?.toLowerCase()}`}>
//                     <StatusIcon status={item.status} /> {item.status}
//                   </div>
//                 </div>

//                 <div className="qc-specs-grid">
//                   <div className="spec-col">
//                     <span className="spec-label">Streaming Formats</span>
//                     <div className="pill-group">
//                       {item.formats?.map(f => <span key={f} className="spec-pill">{f}</span>)}
//                     </div>
//                   </div>
//                   <div className="spec-col">
//                     <span className="spec-label">DRM Protection</span>
//                     <div className="pill-group">
//                       {item.drm?.map(d => <span key={d} className="spec-pill">{d}</span>)}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className={`qc-card-banner banner-${item.status?.toLowerCase()}`}>
//                  <StatusIcon status={item.status} />
//                  <span>{item.notes || "Validation complete. No issues found."}</span>
//               </div>
//             </div>
//           ))}
//           {filteredItems.length === 0 && !isRefreshing && (
//             <div className="empty-state">No jobs found for this filter.</div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PackagingPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiCheckCircle, FiXCircle, FiClock, FiChevronDown,
  FiPackage, FiArrowLeft, FiRefreshCw, FiPieChart, FiBarChart2, FiActivity 
} from "react-icons/fi";
import { 
  Chart as ChartJS, ArcElement, Tooltip, Legend, 
  CategoryScale, LinearScale, BarElement 
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { operatorService } from "../../api/operatorService";
import { MediaTrackLogo } from "../../components/MediaTrackLogo";
import "../../styles/packaging.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const StatusIcon = ({ status }) => {
  const s = status?.toLowerCase();
  if (s === 'passed') return <FiCheckCircle size={16} />;
  if (s === 'failed') return <FiXCircle size={16} />;
  return <FiClock size={16} />;
};

const PackagingPage = () => {
  const navigate = useNavigate();
  const [formatDist, setFormatDist] = useState({ HLS: 0, DASH: 0, MSS: 0 });
  const [statusDist, setStatusDist] = useState({ passed: 0, failed: 0, pending: 0, passRate: "0%" });
  const [qcItems, setQcItems] = useState([]);
  const [healthScore, setHealthScore] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All QC Status");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const results = await Promise.allSettled([
        operatorService.getMediaFormatDistribution(), // /media/metrics/format-distribution
        operatorService.getMediaStatusDistribution(), // /media/metrics/status-distribution
        operatorService.getPackagingJobs(),           // /media
        operatorService.getPackagingHealth(),         // /media/metrics/health
        operatorService.getPackagingMetrics()         // /media/metrics (Counts)
      ]);

      const [resF, resS, resQ, resHealth, resMetrics] = results;

      // 1. Update Format Distribution (Bar Chart)
      if (resF.status === 'fulfilled' && resF.value) setFormatDist(resF.value);
      
      // 2. Update Status Distribution (Doughnut Chart)
      // Note: We use resS (status-distribution) for the chart, resMetrics for the top cards
      
      // 3. Update Top Stats Cards (from /media/metrics)
      if (resMetrics.status === 'fulfilled' && resMetrics.value) {
        setStatusDist(resMetrics.value);
      }

      // 4. Update Health
      if (resHealth.status === 'fulfilled') setHealthScore(resHealth.value.score || resHealth.value);

      // 5. Update Jobs Queue (Mapping Backend keys to Frontend)
      if (resQ.status === 'fulfilled' && resQ.value) {
        const rawData = Array.isArray(resQ.value) ? resQ.value : [];
        
       const mappedJobs = rawData.map(item => ({
  title: item.title || item.assetName || `Asset #${item.assetId || item.id}`, 
  packageId: item.packageId || item.id || '000',
  
  // FIX: Ensure status isn't defaulting to "Pending" because of a wrong key
  status: item.status || item.qcStatus || item.state || "Pending", 
  
  formats: Array.isArray(item.formats) ? item.formats : (item.format ? [item.format] : []),
  drm: Array.isArray(item.drm) ? item.drm : (item.drm ? [item.drm] : []),
  notes: item.notes || "Validation complete."
}));
        
        setQcItems(mappedJobs);
      }
    } catch (e) {
      console.error("Critical Fetch Error:", e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredItems = qcItems.filter(item => {
    if (selectedFilter === "All QC Status") return true;
    // Case-insensitive matching to handle 'Passed' vs 'passed'
    return item.status.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="packaging-page-wrapper">
      <div className="nav-header-packaging">
        <div className="top-right-logo-wrapper">
        <MediaTrackLogo size={36} gap={8} />
      </div>
        <button onClick={() => navigate("/operator")} className="btn-back-link">
          <FiArrowLeft /> Back to Platform Dashboard
        </button>
      </div>

      <header className="packaging-main-header">
        <div className="header-left-content">
          <div className="header-icon-container">
            <FiPackage size={28} color="white" />
          </div>
          <div className="header-text-stack">
            <h1>Packaging & Quality Control</h1>
            <p>Format Packaging & QC Validation</p>
          </div>
        </div>

        

        <div className="header-right-actions">
          <button className="btn-refresh-system" onClick={fetchData} disabled={isRefreshing}>
            <FiRefreshCw className={isRefreshing ? "spin" : ""} /> Refresh System
          </button>
         
        </div>
      </header>

      {/* Stats Cards */}
      <section className="packaging-stats-grid">
        <div className="p-stat-card border-purple">
          <span className="p-stat-number purple-txt">{statusDist.passed || 0}</span>
          <span className="p-stat-label">QC Passed</span>
        </div>
        <div className="p-stat-card border-red">
          <span className="p-stat-number red-txt">{statusDist.failed || 0}</span>
          <span className="p-stat-label">QC Failed</span>
        </div>
        <div className="p-stat-card border-orange">
          <span className="p-stat-number orange-txt">{statusDist.pending || 0}</span>
          <span className="p-stat-label">Pending QC</span>
        </div>
        <div className="p-stat-card border-white">
          <span className="p-stat-number white-txt">{statusDist.passRate || "0%"}</span>
          <span className="p-stat-label">Pass Rate</span>
        </div>
      </section>

      {/* Charts */}
      <section className="packaging-charts-section">
        <div className="p-chart-card">
          <div className="p-chart-header">
            <h5><FiPieChart className="icon-gap" /> QC Status Distribution</h5>
          </div>
          <div className="p-chart-box">
            <Doughnut 
              data={{
                labels: ['Passed', 'Failed', 'Pending'],
                datasets: [{
                  data: [statusDist.passed || 0, statusDist.failed || 0, statusDist.pending || 0],
                  backgroundColor: ['#a371f7', '#ef4444', '#f59e0b'],
                  borderColor: '#12121e', borderWidth: 2,
                }]
              }}
              options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#8b949e', boxWidth: 12 } } }, cutout: '75%' }} 
            />
          </div>
        </div>
        <div className="p-chart-card">
          <div className="p-chart-header">
            <h5><FiBarChart2 className="icon-gap" /> Format Distribution</h5>
          </div>
          <div className="p-chart-box">
            <Bar 
              data={{
                labels: ['HLS', 'DASH', 'MSS'],
                datasets: [{ data: [formatDist.HLS || 0, formatDist.DASH || 0, formatDist.MSS || 0], backgroundColor: '#c9b3f9', borderRadius: 5, barThickness: 20 }]
              }}
              options={{ indexAxis: 'y', maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: '#1a1a2e' }, ticks: { color: '#8b949e' } }, y: { grid: { display: false }, ticks: { color: '#8b949e' } } } }}
            />
          </div>
        </div>
      </section>

      {/* Queue */}
      <section className="validation-queue-container">
        <div className="queue-header-flex">
          <h2>Validation Queue ({filteredItems.length})</h2>
          <div className="dropdown-wrapper">
            <button className="btn-filter-dropdown" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              {selectedFilter} <FiChevronDown />
            </button>
            {isFilterOpen && (
              <ul className="dropdown-menu-list">
                {["All QC Status", "Passed", "Failed", "Pending"].map(opt => (
                  <li key={opt} onClick={() => { setSelectedFilter(opt); setIsFilterOpen(false); }}>{opt}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="qc-items-grid">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="qc-main-card">
              <div className="qc-card-body">
                <div className="qc-row-header">
                  <div className="qc-identity">
                    <div className="qc-icon-box"><FiPackage size={22} /></div>
                    <div className="qc-titles">
                      <span className="qc-main-title">{item.title}</span>
                      <span className="qc-sub-id">{item.packageId}</span>
                    </div>
                  </div>
                  <div className={`qc-status-pill pill-${item.status?.toLowerCase()}`}>
                    <StatusIcon status={item.status} /> {item.status}
                  </div>
                </div>

                <div className="qc-specs-grid">
                  <div className="spec-col">
                    <span className="spec-label">Streaming Formats</span>
                    <div className="pill-group">
                      {item.formats.map(f => <span key={f} className="spec-pill">{f}</span>)}
                    </div>
                  </div>
                  <div className="spec-col">
                    <span className="spec-label">DRM Protection</span>
                    <div className="pill-group">
                      {item.drm.map(d => <span key={d} className="spec-pill">{d}</span>)}
                    </div>
                  </div>
                </div>
              </div>
              <div className={`qc-card-banner banner-${item.status?.toLowerCase()}`}>
                 <StatusIcon status={item.status} />
                 <span>{item.notes}</span>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && !isRefreshing && (
            <div className="empty-state">No jobs found in the queue.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PackagingPage;