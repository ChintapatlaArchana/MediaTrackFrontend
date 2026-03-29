import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiZap, FiRefreshCw, FiChevronDown, FiDatabase, FiArrowLeft, FiClock, FiActivity } from "react-icons/fi";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { operatorService } from "../../api/operatorService";
import { MediaTrackLogo } from "../../MediaTrackLogo";
import "../../styles/ingest.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IngestPage = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Status");
  const [metrics, setMetrics] = useState({});
  const [jobs, setJobs] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      // Assuming operatorService.getIngestJobs() calls your /ingest/all endpoint
      const [m, j] = await Promise.allSettled([
        operatorService.getIngestMetrics(), 
        operatorService.getIngestJobs()
      ]);

      if (m.status === "fulfilled") {
        setMetrics(m.value || {});
      }

      if (j.status === "fulfilled") {
        const rawData = j.value;
        // Spring Boot usually returns a direct array or a wrapped object
        const finalJobs = Array.isArray(rawData) ? rawData : (rawData.jobs || []);
        setJobs(finalJobs);
      }
    } catch (e) { 
      console.error("Fetch Error:", e); 
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const dataTimer = setInterval(fetchData, 30000);
    return () => clearInterval(dataTimer);
  }, []);

  // Filter Logic mapped to your IngestStatus Enum
  const filteredJobs = useMemo(() => {
    if (selectedFilter === "All Status") return jobs;

    return jobs.filter(job => {
      if (!job || !job.ingestStatus) return false;
      
      // Convert Enum "In_progress" to "inprogress" and Filter "In Progress" to "inprogress" for a match
      const jobStatus = job.ingestStatus.toLowerCase().replace(/_/g, "").trim();
      const filterValue = selectedFilter.toLowerCase().replace(/\s+/g, "").trim();
      
      return jobStatus === filterValue;
    });
  }, [jobs, selectedFilter]);

  const chartData = {
    labels: ['Pipeline Health'],
    datasets: [
      { label: 'Queued', data: [metrics.queued || 0], backgroundColor: '#8b5cf6', barThickness: 40 },
      { label: 'In Progress', data: [metrics.inProgress || 0], backgroundColor: '#a78bfa', barThickness: 40 },
      { label: 'Completed', data: [metrics.completed || 0], backgroundColor: '#ddd6fe', barThickness: 40 },
      { label: 'Failed', data: [metrics.failed || 0], backgroundColor: '#ef4444', barThickness: 40 },
    ],
  };

  const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { stacked: true, grid: { display: false }, ticks: { display: false }, border: { display: false } },
      y: { stacked: true, grid: { display: false }, ticks: { display: false }, border: { display: false } }
    }
  };

  return (
    <div className="ingest-page-wrapper">
      <div className="top-right-logo-wrapper">
        <MediaTrackLogo size={36} gap={8} />
      </div>
      <div className="nav-container-top">
        <button onClick={() => navigate("/operator")} className="btn-back-link">
          <FiArrowLeft /> Back to Platform Dashboard
        </button>
      </div>

      <header className="ingest-header-main">
        <div className="header-identity">
          <div className="header-icon-box">
            <FiZap size={28} color="#fff" />
          </div>
          <div className="header-titles">
            <h1>Ingest & Transcode Pipeline</h1>
            <p className="subtitle-text">Queue Management & Job Monitoring</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-refresh-alt" onClick={fetchData} disabled={isRefreshing}>
            <FiRefreshCw className={isRefreshing ? "spin-animation" : ""} />
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        
        </div>
      </header>

      <section className="stats-grid-ingest">
        {/* Metric mapping assumes your DTO uses these keys */}
        <div className="stat-card border-queued">
          <span className="stat-value purple-text">{metrics.queued || 0}</span>
          <span className="stat-label">Queued Jobs</span>
        </div>
        <div className="stat-card border-progress">
          <span className="stat-value light-purple-text">{metrics.in_progress || 0}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card border-completed">
          <span className="stat-value white-text">{metrics.completed || 0}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card border-failed">
          <span className="stat-value red-text">{metrics.failed || 0}</span>
          <span className="stat-label">Failed</span>
        </div>
      </section>

      <section className="chart-section-ingest">
        <div className="chart-card-ingest">
          <div className="chart-header-row">
            <h5 className="chart-title"><FiActivity className="me-2"/>Pipeline Status Distribution</h5>
            <div className="chart-legend-row">
                <span className="legend-item"><span className="dot queued"></span> Queued</span>
                <span className="legend-item"><span className="dot inprogress"></span> In Progress</span>
                <span className="legend-item"><span className="dot completed"></span> Completed</span>
                <span className="legend-item"><span className="dot failed"></span> Failed</span>
            </div>
          </div>
          <div className="chart-body-horizontal">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </section>

      <section className="queue-section">
        <div className="queue-header">
          <h3 className="section-title">Active Pipeline Queue</h3>
          <div className="filter-dropdown-container">
            <button className="btn-filter-alt" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              {selectedFilter} <FiChevronDown />
            </button>
            {isFilterOpen && (
              <div className="filter-menu-popup">
                {["All Status", "Queued", "In Progress", "Completed", "Failed"].map((opt) => (
                  <div key={opt} className="filter-item-opt" onClick={() => { setSelectedFilter(opt); setIsFilterOpen(false); }}>
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="table-container-alt">
          <table className="ingest-table-alt">
            <thead>
              <tr>
                <th>INGEST JOB</th>
                <th>ASSET </th>
                <th>SOURCE URI</th>
                <th>STATUS</th>
                <th>SUBMITTED DATE</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job.ingestId}>
                    <td className="job-id-cell">
                      <FiDatabase className="icon-purple" /> {`ING-${job.ingestId}`}
                    </td>
                    <td className="asset-id-cell">{`AST-${job.assetId}`}</td>
                    <td>
                      <div className="uri-text" title={job.sourceUri}>
                        {job.sourceUri || "No URI"}
                      </div>
                    </td>
                    <td>
                      <div className={`status-badge-alt ${(job.ingestStatus || "unknown").toLowerCase().replace(/_/g, "")}`}>
                        {/* Replace underscore for display, e.g., In_progress -> In progress */}
                        {job.ingestStatus?.replace(/_/g, " ") || "UNKNOWN"}
                      </div>
                    </td>
                    <td className="time-cell">
                      <div className="time-row">
                        <FiClock size={12}/> {job.submittedDate || "N/A"}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "3rem", color: "#8b949e" }}>
                    No jobs found with status: "{selectedFilter}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default IngestPage;