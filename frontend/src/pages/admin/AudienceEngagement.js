import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';

export const AudienceEngagement = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await adminService.getEngagementMetrics();
        setMetrics(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="dashboard-content">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
           <h1 className="page-title">Audience & Engagement</h1>
           <p className="page-subtitle">Executive view of platform engagement</p>
        </div>
        <div className="d-flex gap-2">
           <select className="form-select bg-dark text-light border-secondary" style={{ width: 'auto' }}>
              <option>Platform-Wide</option>
              <option>Basic Plan</option>
              <option>Standard Plan</option>
              <option>Premium Plan</option>
           </select>
           <select className="form-select bg-dark text-light border-secondary" style={{ width: 'auto' }}>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Last 12 Months</option>
           </select>
        </div>
      </div>

      {loading ? (
         <div className="text-center mt-5"><div className="spinner-border text-light" role="status"></div></div>
      ) : (
        <React.Fragment>
           <div className="row g-4 mb-4">
              <div className="col-md-3">
                 <div className="metric-card">
                  <div className="metric-header">
                    <span>DAU</span>
                    <i className="bi bi-people"></i>
                  </div>
                  <div className="metric-value">{metrics?.dau || 387}</div>
                  <div className="metric-sub text-success"><i className="bi bi-arrow-up-short"></i> 5.2% vs last period</div>
                </div>
              </div>
              <div className="col-md-3">
                 <div className="metric-card">
                  <div className="metric-header">
                    <span>MAU</span>
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <div className="metric-value">{metrics?.mau || 1000}</div>
                  <div className="metric-sub text-success"><i className="bi bi-arrow-up-short"></i> 2.1% vs last period</div>
                </div>
              </div>
              <div className="col-md-3">
                 <div className="metric-card">
                  <div className="metric-header">
                    <span>Completion Rate</span>
                    <i className="bi bi-check2-circle"></i>
                  </div>
                  <div className="metric-value">{metrics?.completionRate || 75.3}%</div>
                  <div className="metric-sub text-secondary">rolling 30-day avg</div>
                </div>
              </div>
              <div className="col-md-3">
                 <div className="metric-card">
                  <div className="metric-header">
                    <span>Avg Bitrate</span>
                    <i className="bi bi-broadcast"></i>
                  </div>
                  <div className="metric-value">{metrics?.avgBitrate || '4.2 Mbps'}</div>
                  <div className="metric-sub text-success">Good QoE</div>
                </div>
              </div>
           </div>

           <div className="row g-4">
               <div className="col-md-8">
                  <div className="metric-card" style={{ minHeight: '300px' }}>
                     <div className="metric-header">
                        <span>Total WatchTime (Last 30 Days)</span>
                        <i className="bi bi-clock-history"></i>
                     </div>
                     <div className="d-flex h-100 align-items-center justify-content-center">
                         <div className="text-center text-secondary">
                            <i className="bi bi-graph-up fs-1 mb-2 d-block text-white-50"></i>
                            <small>Trend Line Chart Placeholder</small>
                            <br/>
                            <h4 className="text-white mt-3">28,450 Hours</h4>
                         </div>
                      </div>
                  </div>
               </div>
               <div className="col-md-4">
                   <div className="metric-card" style={{ minHeight: '300px' }}>
                     <div className="metric-header">
                        <span>WatchTime by Plan</span>
                        <i className="bi bi-pie-chart"></i>
                     </div>
                     <div className="d-flex h-100 flex-column justify-content-center">
                         <div className="d-flex justify-content-between mb-3 text-secondary small">
                             <span>Premium Plan</span>
                             <span className="text-white fw-bold">14,200 hrs</span>
                         </div>
                         <div className="d-flex justify-content-between mb-3 text-secondary small">
                             <span>Standard Plan</span>
                             <span className="text-white fw-bold">9,800 hrs</span>
                         </div>
                         <div className="d-flex justify-content-between text-secondary small">
                             <span>Basic Plan</span>
                             <span className="text-white fw-bold">4,450 hrs</span>
                         </div>
                     </div>
                  </div>
               </div>
           </div>
        </React.Fragment>
      )}
    </div>
  );
};
