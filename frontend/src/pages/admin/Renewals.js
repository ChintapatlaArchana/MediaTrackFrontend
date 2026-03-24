import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';

export const Renewals = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetching complex renewals data
    setTimeout(() => {
       setMetrics({
          renewalsDue: 24,
          statusMix: { active: 85, grace: 5, lapsed: 7, cancelled: 3 },
          graceOutcomes: { returned: 70, lapsed: 30 },
          pipeline: { lessThan7: 8, sevenTo14: 6, fifteenTo30: 10 }
       });
       setLoading(false);
    }, 600);
  }, []);

  return (
    <div className="dashboard-content">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
           <h1 className="page-title">Renewals & Lifecycle</h1>
           <p className="page-subtitle">Subscription lifecycle and upcoming renewals</p>
        </div>
        <select className="form-select bg-dark text-light border-secondary" style={{ width: 'auto' }}>
           <option>Status: All</option>
           <option>Status: Active</option>
           <option>Status: Grace</option>
           <option>Status: Lapsed</option>
        </select>
      </div>

      {loading ? (
          <div className="text-center mt-5"><div className="spinner-border text-light" role="status"></div></div>
      ) : (
          <div className="row g-4">
             <div className="col-md-3">
                 <div className="metric-card">
                  <div className="metric-header">
                    <span>Renewals Due</span>
                    <i className="bi bi-calendar-event"></i>
                  </div>
                  <div className="metric-value">{metrics.renewalsDue}</div>
                  <div className="metric-sub text-secondary">Next 30 Days</div>
                </div>
             </div>
             
             <div className="col-md-5">
                 <div className="metric-card">
                  <div className="metric-header mb-4">
                    <span>Status Mix</span>
                    <i className="bi bi-pie-chart"></i>
                  </div>
                  <div className="d-flex w-100 mb-2">
                     <div style={{ width: `${metrics.statusMix.active}%`, height: '12px', backgroundColor: 'var(--mt-success)' }} title="Active"></div>
                     <div style={{ width: `${metrics.statusMix.grace}%`, height: '12px', backgroundColor: 'var(--mt-warning)' }} title="Grace"></div>
                     <div style={{ width: `${metrics.statusMix.lapsed}%`, height: '12px', backgroundColor: 'var(--mt-purple-primary)' }} title="Lapsed"></div>
                     <div style={{ width: `${metrics.statusMix.cancelled}%`, height: '12px', backgroundColor: 'var(--mt-danger)' }} title="Cancelled"></div>
                  </div>
                  <div className="d-flex justify-content-between text-secondary small mt-3">
                     <span><i className="bi bi-circle-fill text-success" style={{fontSize:'8px'}}></i> Active ({metrics.statusMix.active}%)</span>
                     <span><i className="bi bi-circle-fill text-warning" style={{fontSize:'8px'}}></i> Grace ({metrics.statusMix.grace}%)</span>
                     <span><i className="bi bi-circle-fill" style={{color:'var(--mt-purple-primary)', fontSize:'8px'}}></i> Lapsed ({metrics.statusMix.lapsed}%)</span>
                     <span><i className="bi bi-circle-fill text-danger" style={{fontSize:'8px'}}></i> Cancelled ({metrics.statusMix.cancelled}%)</span>
                  </div>
                </div>
             </div>

             <div className="col-md-4">
                 <div className="metric-card">
                  <div className="metric-header mb-3">
                    <span>Grace Outcomes</span>
                    <i className="bi bi-arrow-left-right"></i>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                      <span className="text-secondary small">Returned to Active</span>
                      <span className="fw-bold text-success">{metrics.graceOutcomes.returned}%</span>
                  </div>
                  <div className="progress mb-3" style={{ height: '6px', backgroundColor: 'var(--mt-bg-dark)' }}>
                      <div className="progress-bar bg-success" role="progressbar" style={{ width: `${metrics.graceOutcomes.returned}%`}}></div>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                      <span className="text-secondary small">Churned (Lapsed)</span>
                      <span className="fw-bold text-danger">{metrics.graceOutcomes.lapsed}%</span>
                  </div>
                  <div className="progress" style={{ height: '6px', backgroundColor: 'var(--mt-bg-dark)' }}>
                      <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${metrics.graceOutcomes.lapsed}%`}}></div>
                  </div>
                </div>
             </div>

             <div className="col-md-6">
                 <div className="metric-card">
                  <div className="metric-header mb-4">
                    <span>Renewals Pipeline</span>
                    <i className="bi bi-funnel"></i>
                  </div>
                  <div className="pe-3">
                     <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1 small">
                           <span>Due &lt; 7 Days</span>
                           <span className="text-secondary fw-bold">{metrics.pipeline.lessThan7}</span>
                        </div>
                        <div className="progress" style={{ height: '8px', backgroundColor: 'var(--mt-bg-dark)' }}>
                           <div className="progress-bar bg-danger" role="progressbar" style={{ width: '33%' }}></div>
                        </div>
                     </div>
                     <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1 small">
                           <span>Due 7-14 Days</span>
                           <span className="text-secondary fw-bold">{metrics.pipeline.sevenTo14}</span>
                        </div>
                        <div className="progress" style={{ height: '8px', backgroundColor: 'var(--mt-bg-dark)' }}>
                           <div className="progress-bar bg-warning" role="progressbar" style={{ width: '25%' }}></div>
                        </div>
                     </div>
                     <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1 small">
                           <span>Due 15-30 Days</span>
                           <span className="text-secondary fw-bold">{metrics.pipeline.fifteenTo30}</span>
                        </div>
                        <div className="progress" style={{ height: '8px', backgroundColor: 'var(--mt-bg-dark)' }}>
                           <div className="progress-bar" role="progressbar" style={{ width: '42%', backgroundColor: 'var(--mt-purple-primary)' }}></div>
                        </div>
                     </div>
                  </div>
                </div>
             </div>
             
             <div className="col-md-6">
                 <div className="metric-card">
                  <div className="metric-header mb-4">
                    <span>Cancellations vs Reactivations (6m)</span>
                    <i className="bi bi-bar-chart"></i>
                  </div>
                  <div className="d-flex h-100 align-items-center justify-content-center">
                      <div className="text-center text-secondary">
                         <i className="bi bi-bar-chart-line fs-1 mb-2 d-block text-white-50"></i>
                         <small>Grouped Column Chart Placeholder</small>
                      </div>
                   </div>
                </div>
             </div>
          </div>
      )}
    </div>
  );
};
