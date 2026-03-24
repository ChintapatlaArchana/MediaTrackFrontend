import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifs = async () => {
       try {
          setLoading(true);
          const data = await adminService.getNotifications();
          
          // Generate realistic mocks if backend returns empty or basic mock
          let enriched = data || [];
          if(enriched.length <= 1) {
             enriched = [
                { id: 101, category: 'Delivery', message: 'CDN PoP latency spike (US-East)', status: 'Unread', createdDate: new Date(Date.now() - 2*3600*1000) },
                { id: 102, category: 'Subscription', message: 'Stripe webhook failure', status: 'Unread', createdDate: new Date(Date.now() - 28*3600*1000) },
                { id: 103, category: 'Content', message: 'Ingest queue backed up', status: 'Unread', createdDate: new Date(Date.now() - 80*3600*1000) },
                { id: 104, category: 'AdOps', message: 'Campaign #8821 under-pacing', status: 'Read', createdDate: new Date(Date.now() - 5*3600*1000) },
                { id: 105, category: 'Delivery', message: 'DRM License server timeout', status: 'Unread', createdDate: new Date(Date.now() - 1*3600*1000) }
             ];
             // Add 5 more random ones
             const cat = ['Subscription', 'Content', 'Delivery', 'AdOps'];
             for(let i=0; i<5; i++) {
                 enriched.push({
                     id: 200+i, category: cat[i%4], message: 'System automated alert ' + i, status: i%2===0?'Unread':'Read', createdDate: new Date(Date.now() - (i*10)*3600*1000)
                 });
             }
          }
          setNotifications(enriched);
       } catch (e) {
          console.error(e);
       } finally {
          setLoading(false);
       }
    };
    fetchNotifs();
  }, []);

  const unread = notifications.filter(n => n.status === 'Unread');
  
  // Group by category
  const catCount = unread.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
  }, {});
  const totalUnread = unread.length || 1; // prevent div by zero

  // Alert Aging
  const now = new Date();
  const aging = { '<24h': 0, '24-72h': 0, '>72h': 0 };
  unread.forEach(n => {
      const diffHrs = (now - new Date(n.createdDate)) / (1000 * 60 * 60);
      if (diffHrs < 24) aging['<24h']++;
      else if (diffHrs <= 72) aging['24-72h']++;
      else aging['>72h']++;
  });

  const getCategoryColor = (cat) => {
     switch(cat) {
        case 'Delivery': return 'var(--mt-danger)';
        case 'Subscription': return 'var(--mt-warning)';
        case 'Content': return 'var(--mt-purple-primary)';
        default: return 'var(--mt-success)';
     }
  };

  const getCategoryIcon = (cat) => {
     switch(cat) {
        case 'Delivery': return 'bi-hdd-network';
        case 'Subscription': return 'bi-credit-card';
        case 'Content': return 'bi-film';
        default: return 'bi-megaphone';
     }
  };

  return (
    <div className="dashboard-content">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
           <h1 className="page-title">Notifications & Alerts</h1>
           <p className="page-subtitle">High-priority platform alerts</p>
        </div>
        <button className="btn btn-outline-light btn-sm"><i className="bi bi-check2-all me-2"></i>Mark all as read</button>
      </div>

      {loading ? (
          <div className="text-center mt-5"><div className="spinner-border text-light" role="status"></div></div>
      ) : (
          <div className="row g-4">
             <div className="col-md-5">
                 <div className="metric-card">
                  <div className="metric-header mb-4">
                    <span>Unread by Category</span>
                    <i className="bi bi-pie-chart"></i>
                  </div>
                  <div className="d-flex w-100 mb-2">
                     {Object.entries(catCount).map(([cat, count]) => (
                         <div key={cat} style={{ width: `${(count/totalUnread)*100}%`, height: '12px', backgroundColor: getCategoryColor(cat) }} title={cat}></div>
                     ))}
                  </div>
                  <div className="d-flex justify-content-between text-secondary small mt-3 flex-wrap gap-2">
                     {Object.entries(catCount).map(([cat, count]) => (
                         <span key={cat}><i className="bi bi-circle-fill" style={{color: getCategoryColor(cat), fontSize:'8px'}}></i> {cat} ({count})</span>
                     ))}
                  </div>
                </div>

                <div className="metric-card mt-4">
                  <div className="metric-header mb-4">
                    <span>Alert Aging (Unread)</span>
                    <i className="bi bi-bar-chart-steps"></i>
                  </div>
                  <div className="pe-3">
                     <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1 small">
                           <span>&lt; 24h</span>
                           <span className="text-secondary fw-bold">{aging['<24h']}</span>
                        </div>
                        <div className="progress" style={{ height: '8px', backgroundColor: 'var(--mt-bg-dark)' }}>
                           <div className="progress-bar" role="progressbar" style={{ width: `${(aging['<24h']/totalUnread)*100}%`, backgroundColor: 'var(--mt-purple-primary)' }}></div>
                        </div>
                     </div>
                     <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1 small">
                           <span>24 - 72h</span>
                           <span className="text-secondary fw-bold">{aging['24-72h']}</span>
                        </div>
                        <div className="progress" style={{ height: '8px', backgroundColor: 'var(--mt-bg-dark)' }}>
                           <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${(aging['24-72h']/totalUnread)*100}%` }}></div>
                        </div>
                     </div>
                     <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1 small">
                           <span>&gt; 72h</span>
                           <span className="text-secondary fw-bold">{aging['>72h']}</span>
                        </div>
                        <div className="progress" style={{ height: '8px', backgroundColor: 'var(--mt-bg-dark)' }}>
                           <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${(aging['>72h']/totalUnread)*100}%` }}></div>
                        </div>
                     </div>
                  </div>
                </div>
             </div>

             <div className="col-md-7">
                 <div className="metric-card" style={{ minHeight: '500px' }}>
                  <div className="metric-header border-bottom border-secondary pb-3 mb-3">
                    <span>Recent Notifications</span>
                    <i className="bi bi-list"></i>
                  </div>
                  <div className="list-group list-group-flush bg-transparent">
                     {notifications.slice(0, 10).map((notif, idx) => {
                         const timeAgo = Math.floor((new Date() - new Date(notif.createdDate)) / (1000 * 60 * 60));
                         let timeStr = timeAgo < 1 ? 'Just now' : (timeAgo < 24 ? `${timeAgo}h ago` : `${Math.floor(timeAgo/24)}d ago`);
                         return (
                            <div key={notif.id} className="list-group-item bg-transparent text-light border-secondary px-0 py-3 d-flex align-items-start">
                               <div className="me-3 mt-1" style={{ color: getCategoryColor(notif.category) }}>
                                  <i className={`bi ${getCategoryIcon(notif.category)} fs-5`}></i>
                               </div>
                               <div className="flex-grow-1">
                                  <div className="d-flex justify-content-between w-100">
                                     <h6 className={`mb-1 ${notif.status === 'Unread' ? 'fw-bold' : 'text-secondary fw-normal'}`}>{notif.message}</h6>
                                     <small className="text-secondary ms-2 text-nowrap">{timeStr}</small>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center mt-2">
                                     <small style={{ color: getCategoryColor(notif.category) }}>{notif.category}</small>
                                     {notif.status === 'Unread' && <span className="badge rounded-pill bg-danger" style={{fontSize: '0.65em'}}>New</span>}
                                  </div>
                               </div>
                            </div>
                         );
                     })}
                  </div>
                </div>
             </div>
          </div>
      )}
    </div>
  );
};
