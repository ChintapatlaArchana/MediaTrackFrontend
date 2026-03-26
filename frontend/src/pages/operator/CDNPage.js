// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   FiGlobe, FiRefreshCw, FiChevronDown, FiServer,
//   FiLayers, FiWifi, FiArrowLeft
// } from "react-icons/fi";
// import { operatorService } from "../../api/operatorService";
// import { MediaTrackLogo } from "../../components/MediaTrackLogo";
// import "../../styles/cdn.css";

// const CDNPage = () => {
//   const navigate = useNavigate();
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [selectedRegion, setSelectedRegion] = useState("All Regions");
//   const [summary, setSummary] = useState({ active: "5/6", latency: "22ms" });
//   const [regionData, setRegionData] = useState([
//     { name: "North America", short: "NA", latency: "13.5ms", perf: "EXCELLENT", color: "purple" },
//     { name: "Europe", short: "EU", latency: "19ms", perf: "GOOD", color: "purple" },
//     { name: "Asia Pacific", short: "AP", latency: "45ms", perf: "WARNING", color: "orange" },
//     { name: "South America", short: "SA", latency: "22ms", perf: "GOOD", color: "purple" },
//   ]);
//   const [nodeData, setNodeData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const [active, total, latency] = await Promise.all([
//         operatorService.getCDNActiveCount(), 
//         operatorService.getCDNTotalCount(), 
//         operatorService.getCDNAvgLatency()
//       ]);
//       setSummary({ 
//         active: `${active || 5}/${total || 6}`, 
//         latency: `${latency || 22}ms` 
//       });

//       // Fetching logic for nodes...
//       const res = await operatorService.getCDNRegionPerformance(selectedRegion === "All Regions" ? "North America" : selectedRegion);
//       setNodeData(res.nodes || []);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => { fetchData(); }, [selectedRegion]);

//   return (
//     <div className="cdn-page-wrapper">
//       <div className="nav-container-top">
//         <button onClick={() => navigate("/operator")} className="btn-back-link">
//           <FiArrowLeft /> Back to Platform Dashboard
//         </button>
//       </div>

//       <header className="cdn-header-main">
//         <div className="header-identity">
//           <div className="header-icon-box">
//             <FiGlobe size={28} color="#fff" />
//           </div>
//           <div className="header-titles">
//             <h1>CDN Infrastructure</h1>
//             <p className="subtitle-text">Global Network Health & Delivery Monitoring</p>
//           </div>
//         </div>
//         <div className="header-actions">
//            <button className="btn-refresh-alt" onClick={fetchData} disabled={isLoading}>
//             <FiRefreshCw className={isLoading ? "spin-animation" : ""} />
//             <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
//           </button>
//           <MediaTrackLogo />
//         </div>
//       </header>

//       {/* SUMMARY STATS - Matches Screenshot 4 */}
//       <section className="stats-container">
//         <div className="stat-card">
//           <div className="stat-content">
//             <div className="stat-label-group">
//               <FiLayers className="stat-icon purple" />
//               <span className="stat-label">ACTIVE ENDPOINTS</span>
//             </div>
//             <span className="stat-value purple-text">{summary.active}</span>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-content">
//             <div className="stat-label-group">
//               <FiWifi className="stat-icon orange" />
//               <span className="stat-label">AVG LATENCY</span>
//             </div>
//             <span className="stat-value orange-text">{summary.latency}</span>
//           </div>
//         </div>
//       </section>

//       {/* HEATMAP SECTION - Matches Screenshot 4 */}
//       <section className="heatmap-section">
//         <h4 className="section-title">Global Regional Performance Heatmap</h4>
//         <div className="heatmap-grid">
//           {regionData.map((region, idx) => (
//             <div key={idx} className={`heatmap-card ${region.color}`}>
//               <div className="heatmap-top">
//                 <span className="region-short">{region.short}</span>
//                 <FiGlobe size={18} />
//               </div>
//               <h3 className="region-name">{region.name}</h3>
//               <div className="heatmap-metrics">
//                 <span className="metric-label">Latency</span>
//                 <span className="metric-value">{region.latency}</span>
//               </div>
//               <div className="heatmap-status">
//                 <span className="status-dot"></span>
//                 <span className="status-text">{region.perf}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* NODE DETAILS - Matches Screenshot 5 & 6 */}
//       <section className="nodes-section">
//         <div className="nodes-header">
//           <h4 className="section-title">CDN Node Details</h4>
//           <div className="filter-dropdown-container">
//             <button className="btn-filter-alt" onClick={() => setIsFilterOpen(!isFilterOpen)}>
//               {selectedRegion} <FiChevronDown />
//             </button>
//             {isFilterOpen && (
//               <div className="filter-menu-popup">
//                 {["All Regions", "North America", "Europe", "Asia Pacific", "South America"].map(opt => (
//                   <div key={opt} className="filter-item-opt" onClick={() => { setSelectedRegion(opt); setIsFilterOpen(false); }}>
//                     {opt}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="nodes-grid">
//           {nodeData.map((node, idx) => (
//             <div key={idx} className="node-card">
//               <div className="node-card-top">
//                 <div className="node-identity">
//                   <div className="node-icon-bg"><FiServer size={20} color="#c9b3f9" /></div>
//                   <div className="node-names">
//                     <h6 className="node-title">{node.name}</h6>
//                     <span className="node-id">{node.id}</span>
//                   </div>
//                 </div>
//                 <div className={`status-badge ${node.status?.toLowerCase()}`}>
//                   {node.status}
//                 </div>
//               </div>

//               <div className="url-display-box">
//                 <span className="url-label">Base URL</span>
//                 <span className="url-text">{node.baseUrl}</span>
//               </div>

//               <div className="node-meta-row">
//                 <div className="meta-item">
//                   <FiGlobe className="meta-icon purple" />
//                   <div className="meta-stack">
//                     <span className="meta-label">Region</span>
//                     <span className="meta-value">{node.region}</span>
//                   </div>
//                 </div>
//                 <div className="meta-item">
//                   <FiWifi className="meta-icon orange" />
//                   <div className="meta-stack">
//                     <span className="meta-label">Latency</span>
//                     <span className="meta-value orange-text">{node.latency}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default CDNPage;

// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   FiGlobe, FiRefreshCw, FiChevronDown, FiServer,
//   FiLayers, FiWifi, FiArrowLeft
// } from "react-icons/fi";
// import { operatorService } from "../../api/operatorService";
// import { MediaTrackLogo } from "../../components/MediaTrackLogo";
// import "../../styles/cdn.css";

// const CDNPage = () => {
//   const navigate = useNavigate();
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [selectedRegion, setSelectedRegion] = useState("All Regions");
//   const [summary, setSummary] = useState({ active: "0/0", latency: "0ms" });
//   const [nodeData, setNodeData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Default region data for the heatmap
//   const regionData = [
//     { name: "North America", short: "NA", latency: "13.5ms", perf: "EXCELLENT", color: "purple" },
//     { name: "Europe", short: "EU", latency: "19ms", perf: "GOOD", color: "purple" },
//     { name: "Asia Pacific", short: "AP", latency: "45ms", perf: "WARNING", color: "orange" },
//     { name: "South America", short: "SA", latency: "22ms", perf: "GOOD", color: "purple" },
//   ];

//   const fetchData = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       // 1. Fetch Summary Stats
//       const [active, total, latency] = await Promise.all([
//         operatorService.getCDNActiveCount(), 
//         operatorService.getCDNTotalCount(), 
//         operatorService.getCDNAvgLatency()
//       ]);
      
//       setSummary({ 
//         active: `${active || 0}/${total || 0}`, 
//         latency: `${latency || 0}ms` 
//       });

//       // 2. Conditional Logic for Nodes
//       let res;
//       if (selectedRegion === "All Regions") {
//         // Calls http://localhost:8082/cdn/all
//         res = await operatorService.getAllCDNNodes();
//       } else {
//         // Calls http://localhost:8082/cdn/region/{region}
//         res = await operatorService.getCDNRegionPerformance(selectedRegion);
//       }

//       // 3. Robust Data Mapping
//       // Handles both direct arrays [{}, {}] and { nodes: [{}, {}] }
//       const finalNodes = Array.isArray(res) ? res : (res?.nodes || []);
//       setNodeData(finalNodes);

//     } catch (e) {
//       console.error("CDN Fetch Error:", e);
//       setNodeData([]); 
//     } finally {
//       setIsLoading(false);
//     }
//   }, [selectedRegion]);

//   useEffect(() => { 
//     fetchData(); 
//   }, [fetchData]);

//   return (
//     <div className="cdn-page-wrapper">
//       <div className="nav-container-top">
//         <button onClick={() => navigate("/operator")} className="btn-back-link">
//           <FiArrowLeft /> Back to Platform Dashboard
//         </button>
//       </div>

//       <header className="cdn-header-main">
//         <div className="header-identity">
//           <div className="header-icon-box">
//             <FiGlobe size={28} color="#fff" />
//           </div>
//           <div className="header-titles">
//             <h1>CDN Infrastructure</h1>
//             <p className="subtitle-text">Global Network Health & Delivery Monitoring</p>
//           </div>
//         </div>
//         <div className="header-actions">
//            <button className="btn-refresh-alt" onClick={fetchData} disabled={isLoading}>
//             <FiRefreshCw className={isLoading ? "spin-animation" : ""} />
//             <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
//           </button>
//           <MediaTrackLogo />
//         </div>
//       </header>

//       {/* SUMMARY STATS */}
//       <section className="stats-container">
//         <div className="stat-card">
//           <div className="stat-content">
//             <div className="stat-label-group">
//               <FiLayers className="stat-icon purple" />
//               <span className="stat-label">ACTIVE ENDPOINTS</span>
//             </div>
//             <span className="stat-value purple-text">{summary.active}</span>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-content">
//             <div className="stat-label-group">
//               <FiWifi className="stat-icon orange" />
//               <span className="stat-label">AVG LATENCY</span>
//             </div>
//             <span className="stat-value orange-text">{summary.latency}</span>
//           </div>
//         </div>
//       </section>

//       {/* HEATMAP SECTION */}
//       <section className="heatmap-section">
//         <h4 className="section-title">Global Regional Performance Heatmap</h4>
//         <div className="heatmap-grid">
//           {regionData.map((region, idx) => (
//             <div key={idx} className={`heatmap-card ${region.color}`}>
//               <div className="heatmap-top">
//                 <span className="region-short">{region.short}</span>
//                 <FiGlobe size={18} />
//               </div>
//               <h3 className="region-name">{region.name}</h3>
//               <div className="heatmap-metrics">
//                 <span className="metric-label">Latency</span>
//                 <span className="metric-value">{region.latency}</span>
//               </div>
//               <div className="heatmap-status">
//                 <span className="status-dot"></span>
//                 <span className="status-text">{region.perf}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* NODE DETAILS */}
//       <section className="nodes-section">
//         <div className="nodes-header">
//           <h4 className="section-title">CDN Node Details ({nodeData.length})</h4>
//           <div className="filter-dropdown-container">
//             <button className="btn-filter-alt" onClick={() => setIsFilterOpen(!isFilterOpen)}>
//               {selectedRegion} <FiChevronDown />
//             </button>
//             {isFilterOpen && (
//               <div className="filter-menu-popup">
//                 {["All Regions", "North America", "Europe", "Asia Pacific", "South America"].map(opt => (
//                   <div key={opt} className="filter-item-opt" onClick={() => { setSelectedRegion(opt); setIsFilterOpen(false); }}>
//                     {opt}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="nodes-grid">
//           {nodeData.length > 0 ? nodeData.map((node, idx) => (
//             <div key={idx} className="node-card">
//               <div className="node-card-top">
//                 <div className="node-identity">
//                   <div className="node-icon-bg"><FiServer size={20} color="#c9b3f9" /></div>
//                   <div className="node-names">
//                     <h6 className="node-title">{node.name || "Edge Node"}</h6>
//                     <span className="node-id">{node.id}</span>
//                   </div>
//                 </div>
//                 <div className={`status-badge ${(node.status || 'offline').toLowerCase()}`}>
//                   {node.status || "Offline"}
//                 </div>
//               </div>

//               <div className="url-display-box">
//   <span className="url-label">Base URL</span>
//   <span className="url-text">
//     {/* Try camelCase, then snake_case, then just 'url' */}
//     {node.baseUrl || node.base_url || node.url || "URL Not Found"}
//   </span>
// </div>

//               <div className="node-meta-row">
//                 <div className="meta-item">
//                   <FiGlobe className="meta-icon purple" />
//                   <div className="meta-stack">
//                     <span className="meta-label">Region</span>
//                     <span className="meta-value">{node.region}</span>
//                   </div>
//                 </div>
//                 <div className="meta-item">
//                   <FiWifi className="meta-icon orange" />
//                   <div className="meta-stack">
//                     <span className="meta-label">Latency</span>
//                     <span className="meta-value orange-text">{node.latency ? `${node.latency}ms` : "--"}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )) : (
//             <div className="empty-state-message">
//               {!isLoading && <p>No nodes available for this selection.</p>}
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default CDNPage;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiGlobe, FiRefreshCw, FiChevronDown, FiServer,
  FiLayers, FiWifi, FiArrowLeft
} from "react-icons/fi";
import { operatorService } from "../../api/operatorService";
import { MediaTrackLogo } from "../../components/MediaTrackLogo";
import "../../styles/cdn.css";

const CDNPage = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [summary, setSummary] = useState({ active: "0/0", latency: "0ms" });
  const [nodeData, setNodeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const regionData = [
    { name: "North America", short: "NA", latency: "13.5ms", perf: "EXCELLENT", color: "purple" },
    { name: "Europe", short: "EU", latency: "19ms", perf: "GOOD", color: "purple" },
    { name: "Asia Pacific", short: "AP", latency: "45ms", perf: "WARNING", color: "orange" },
    { name: "South America", short: "SA", latency: "22ms", perf: "GOOD", color: "purple" },
  ];

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    console.log(`Fetching data for: ${selectedRegion}`);
    
    try {
      // 1. Fetch Summary Stats
      const [active, total, latency] = await Promise.all([
        operatorService.getCDNActiveCount(), 
        operatorService.getCDNTotalCount(), 
        operatorService.getCDNAvgLatency()
      ]);
      
      setSummary({ 
        active: `${active || 0}/${total || 0}`, 
        latency: `${latency || 0}ms` 
      });

      // 2. Filter Logic: Determine which API to call
      let res;
      if (selectedRegion === "All Regions") {
        console.log("Action: Calling getAllCDNNodes()");
        res = await operatorService.getAllCDNNodes();
      } else {
        console.log(`Action: Calling getCDNRegionPerformance("${selectedRegion}")`);
        res = await operatorService.getCDNRegionPerformance(selectedRegion);
      }

      // 3. Mapping and Debugging
      console.log("Response Data:", res);
      const finalNodes = Array.isArray(res) ? res : (res?.nodes || []);
      setNodeData(finalNodes);

    } catch (e) {
      console.error("CDN Fetch Error:", e);
      setNodeData([]); 
    } finally {
      setIsLoading(false);
    }
  }, [selectedRegion]);

  useEffect(() => { 
    fetchData(); 
  }, [fetchData]);

  return (
    <div className="cdn-page-wrapper">
      <div className="top-right-logo-wrapper">
        <MediaTrackLogo size={36} gap={8} />
      </div>
      <div className="nav-container-top">
        <button onClick={() => navigate("/operator")} className="btn-back-link">
          <FiArrowLeft /> Back to Platform Dashboard
        </button>
      </div>

      <header className="cdn-header-main">
        <div className="header-identity">
          <div className="header-icon-box">
            <FiGlobe size={28} color="#fff" />
          </div>
          <div className="header-titles">
            <h1>CDN Infrastructure</h1>
            <p className="subtitle-text">Global Network Health & Delivery Monitoring</p>
          </div>
        </div>
        <div className="header-actions">
           <button className="btn-refresh-alt" onClick={fetchData} disabled={isLoading}>
            <FiRefreshCw className={isLoading ? "spin-animation" : ""} />
            <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
          </button>
       
        </div>
      </header>

      {/* SUMMARY STATS */}
      <section className="stats-container">
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-label-group">
              <FiLayers className="stat-icon purple" />
              <span className="stat-label">ACTIVE ENDPOINTS</span>
            </div>
            <span className="stat-value purple-text">{summary.active}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-label-group">
              <FiWifi className="stat-icon orange" />
              <span className="stat-label">AVG LATENCY</span>
            </div>
            <span className="stat-value orange-text">{summary.latency}</span>
          </div>
        </div>
      </section>

      {/* HEATMAP SECTION */}
      <section className="heatmap-section">
        <h4 className="section-title">Global Regional Performance Heatmap</h4>
        <div className="heatmap-grid">
          {regionData.map((region, idx) => (
            <div key={idx} className={`heatmap-card ${region.color}`}>
              <div className="heatmap-top">
                <span className="region-short">{region.short}</span>
                <FiGlobe size={18} />
              </div>
              <h3 className="region-name">{region.name}</h3>
              <div className="heatmap-metrics">
                <span className="metric-label">Latency</span>
                <span className="metric-value">{region.latency}</span>
              </div>
              <div className="heatmap-status">
                <span className="status-dot"></span>
                <span className="status-text">{region.perf}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NODE DETAILS */}
      <section className="nodes-section">
        <div className="nodes-header">
          <h4 className="section-title">CDN Node Details ({nodeData.length})</h4>
          <div className="filter-dropdown-container">
            <button className="btn-filter-alt" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              {selectedRegion} <FiChevronDown />
            </button>
            {isFilterOpen && (
              <div className="filter-menu-popup">
                {["All Regions", "North America", "Europe", "Asia Pacific", "South America"].map(opt => (
                  <div key={opt} className="filter-item-opt" onClick={() => { setSelectedRegion(opt); setIsFilterOpen(false); }}>
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="nodes-grid">
          {nodeData.length > 0 ? nodeData.map((node, idx) => (
            <div key={node.endpointID || idx} className="node-card">
              <div className="node-card-top">
                <div className="node-identity">
                  <div className="node-icon-bg"><FiServer size={20} color="#c9b3f9" /></div>
                  <div className="node-names">
                    <h6 className="node-title">{node.name || "Edge Node"}</h6>
                    {/* FIXED: Using endpointID from backend */}
                    <span className="node-id">ID: {node.endpointID}</span>
                  </div>
                </div>
                <div className={`status-badge ${(node.status || 'offline').toLowerCase()}`}>
                  {node.status || "Offline"}
                </div>
              </div>

              <div className="url-display-box">
                <span className="url-label">Base URL</span>
                <span className="url-text">
                  {/* FIXED: Using baseURL (exact case match for backend) */}
                  {node.baseURL || "URL Not Found"}
                </span>
              </div>

              <div className="node-meta-row">
                <div className="meta-item">
                  <FiGlobe className="meta-icon purple" />
                  <div className="meta-stack">
                    <span className="meta-label">Region</span>
                    <span className="meta-value">{node.region}</span>
                  </div>
                </div>
                
              </div>
            </div>
          )) : (
            <div className="empty-state-message">
              {!isLoading && <p>No nodes found for {selectedRegion}.</p>}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CDNPage;