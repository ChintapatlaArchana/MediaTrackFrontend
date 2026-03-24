import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';

export const RolesPolicies = () => {
  const [loading, setLoading] = useState(false);
  
  // Mock data for roles and policies
  const roleDistribution = [
    { role: 'Viewer/Subscriber', count: 850, percent: 85 },
    { role: 'Content Editor', count: 45, percent: 4.5 },
    { role: 'Ad Ops/Sales', count: 30, percent: 3 },
    { role: 'Platform Operator', count: 50, percent: 5 },
    { role: 'Media Admin', count: 25, percent: 2.5 }
  ];

  const adminAccounts = { active: 22, inactive: 3 };

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1 className="page-title">Roles & Policies</h1>
        <p className="page-subtitle">RBAC Governance and Entitlements</p>
      </div>

      <div className="row g-4 mb-4">
        {/* Metric Cards */}
        <div className="col-md-4">
          <div className="metric-card">
            <div className="metric-header">
              <span>Admin Accounts</span>
              <i className="bi bi-shield-lock"></i>
            </div>
            <div className="d-flex align-items-baseline">
                <div className="metric-value me-2">{adminAccounts.active + adminAccounts.inactive}</div>
                <div className="metric-sub">Total</div>
            </div>
            <div className="mt-3 text-secondary small">
              <span className="text-success me-3"><i className="bi bi-circle-fill me-1" style={{fontSize: '8px'}}></i> {adminAccounts.active} Active</span>
              <span className="text-danger"><i className="bi bi-circle-fill me-1" style={{fontSize: '8px'}}></i> {adminAccounts.inactive} Inactive</span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="metric-card">
            <div className="metric-header">
              <span>Entitlement Scope</span>
              <i className="bi bi-file-earmark-lock"></i>
            </div>
            <div className="d-flex h-100 align-items-center justify-content-center">
                 <div className="text-center text-secondary">
                    <i className="bi bi-pie-chart fs-2 mb-2 d-block text-white-50"></i>
                    <small>All (70%) | Category (20%) | Title (10%)</small>
                 </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
           <div className="metric-card">
            <div className="metric-header">
              <span>Expiring Special Grants</span>
              <i className="bi bi-hourglass-split"></i>
            </div>
            <div className="mt-2">
               <div className="d-flex justify-content-between text-secondary small mb-1">
                  <span>&lt; 7 Days</span>
                  <span className="text-danger fw-bold">12</span>
               </div>
               <div className="d-flex justify-content-between text-secondary small mb-1">
                  <span>7-30 Days</span>
                  <span className="text-warning fw-bold">34</span>
               </div>
               <div className="d-flex justify-content-between text-secondary small">
                  <span>&gt; 30 Days</span>
                  <span className="text-success fw-bold">89</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
           <div className="metric-card">
              <div className="metric-header mb-4">
                 <span>Users by Role</span>
                 <i className="bi bi-bar-chart-steps"></i>
              </div>
              <div className="pe-3">
                 {roleDistribution.map((item, idx) => (
                    <div key={idx} className="mb-3">
                       <div className="d-flex justify-content-between mb-1 small">
                          <span>{item.role}</span>
                          <span className="text-secondary">{item.count} users ({item.percent}%)</span>
                       </div>
                       <div className="progress" style={{ height: '6px', backgroundColor: 'var(--mt-bg-dark)' }}>
                          <div className="progress-bar" role="progressbar" style={{ width: `${item.percent}%`, backgroundColor: 'var(--mt-purple-primary)' }}></div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="col-md-6">
           <div className="metric-card">
              <div className="metric-header mb-4">
                 <span>Policy Drift (Exceptions)</span>
                 <i className="bi bi-exclamation-triangle"></i>
              </div>
              <div className="table-responsive">
                 <table className="table table-dark table-sm table-borderless align-middle" style={{ backgroundColor: 'transparent' }}>
                    <thead>
                       <tr className="text-secondary border-bottom border-secondary">
                          <th>User ID</th>
                          <th>Plan Default</th>
                          <th>Actual Grant</th>
                       </tr>
                    </thead>
                    <tbody>
                       <tr>
                          <td>usr_9821</td>
                          <td>Category Scope</td>
                          <td className="text-warning">All Content</td>
                       </tr>
                       <tr>
                          <td>usr_1102</td>
                          <td>Basic (Ads)</td>
                          <td className="text-warning">Ad-free override</td>
                       </tr>
                       <tr>
                          <td>usr_3341</td>
                          <td>2 Devices</td>
                          <td className="text-warning">4 Devices</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
              <div className="mt-auto pt-3 text-end">
                 <button className="btn btn-sm btn-outline-secondary" style={{ borderColor: 'var(--mt-border)', color: 'var(--mt-text-secondary)' }}>View All Exceptions</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
