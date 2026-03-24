import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';

export const PlansPricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const data = await adminService.getPlans();
        setPlans(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  
  const parseEntitlements = (entitlementsJSON) => {
    try {
      return JSON.parse(entitlementsJSON);
    } catch (e) {
      console.error("Invalid entitlements JSON:", entitlementsJSON);
      return null;
    }
  };


  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1 className="page-title">Plans & Pricing</h1>
        <p className="page-subtitle">Subscription plan management and analytics</p>
      </div>

      <div className="row mb-5">
        <div className="col-12">
           <h4 className="mb-3">Plan Inventory</h4>
           {loading ? (
              <div className="spinner-border text-light" role="status"></div>
           ) : (
             <div className="table-responsive">
              <table className="table table-dark table-hover align-middle border-secondary" style={{ backgroundColor: 'var(--mt-bg-panel)' }}>
                <thead>
                  <tr style={{ borderColor: 'var(--mt-border)' }}>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Billing Cycle</th>
                    <th>Status</th>
                    <th>Entitlements</th>
                  </tr>
                </thead>
                  <tbody>
                    {plans.map(plan => {
                    const entitlements = parseEntitlements(plan.entitlementsJSON);

                    return (
                      <tr key={plan.planId}>
                      <td className="fw-bold">{plan.name}</td>
                      <td>₹{plan.price}</td>
                      <td>{plan.billingCycle}</td>
                      <td>
                        <span className={`badge ${plan.status === "Active" ? "bg-success" : "bg-secondary"}`}>
                          {plan.status}
                        </span>
                      </td>
                      <td className="text-secondary small">
                        {entitlements ? (
                      <>
                      <div>Quality: {entitlements.videoQuality}</div>
                      <div>Devices: {entitlements.allowedDevices}</div>
                      <div>Downloads: {entitlements.downloads ? "Yes" : "No"}</div>
                      <div>Ads: {entitlements.ads ? "Yes" : "No"}</div>
                      <div>
                    Categories: {entitlements.accessibleCategories?.join(", ")}
                  </div>
                </>
              ) : (
            <span className="text-danger">Invalid entitlements</span>
          )}
        </td>
      </tr>
    );
  })}

  {plans.length === 0 && (
    <tr>
      <td colSpan="6" className="text-center text-secondary py-4">
        No plans found.
      </td>
    </tr>
  )}
</tbody>
              </table>
             </div>
           )}
        </div>
      </div>
      
      {/* Mock Analytics Section */}
      <div className="row g-4">
         <div className="col-md-6">
            <div className="metric-card">
              <div className="metric-header">
                <span>Active Subs by Plan</span>
              </div>
              <div className="d-flex h-100 flex-column justify-content-center p-3">
                 <div className="d-flex justify-content-between mb-2">
                    <span>Basic</span>
                    <span className="fw-bold">45%</span>
                 </div>
                 <div className="progress mb-4" style={{ height: '8px', backgroundColor: 'var(--mt-bg-dark)' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '45%', backgroundColor: 'var(--mt-purple-primary)' }}></div>
                 </div>

                 <div className="d-flex justify-content-between mb-2">
                    <span>Standard</span>
                    <span className="fw-bold">35%</span>
                 </div>
                 <div className="progress mb-4" style={{ height: '8px', backgroundColor: 'var(--mt-bg-dark)' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '35%', backgroundColor: '#6A3AFF' }}></div>
                 </div>

                 <div className="d-flex justify-content-between mb-2">
                    <span>Premium</span>
                    <span className="fw-bold">20%</span>
                 </div>
                 <div className="progress mb-2" style={{ height: '8px', backgroundColor: 'var(--mt-bg-dark)' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '20%', backgroundColor: '#BBA6FF' }}></div>
                 </div>
              </div>
            </div>
         </div>
         
         <div className="col-md-6">
            <div className="metric-card">
              <div className="metric-header">
                <span>MRR by Plan (Contribution)</span>
              </div>
              <div className="d-flex h-100 align-items-center justify-content-center">
                 <div className="text-center text-secondary">
                    <i className="bi bi-pie-chart fs-1 mb-2 d-block text-white-50"></i>
                    Requires charting library for Area/Donut charts.<br/>
                    <small>Standard makes up 55% of MRR</small>
                 </div>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
};
