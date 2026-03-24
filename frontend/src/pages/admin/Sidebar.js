import React from 'react';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  const navItems = [
    { path: '/admin/overview', icon: 'bi-grid-1x2', label: 'Overview' },
    { path: '/admin/plans-pricing', icon: 'bi-credit-card', label: 'Plans & Pricing' },
    { path: '/admin/roles-policies', icon: 'bi-shield-check', label: 'Roles & Policies' },
    { path: '/admin/audience', icon: 'bi-people', label: 'Audience & Engagement' },
    { path: '/admin/revenue', icon: 'bi-currency-dollar', label: 'Revenue' },
    { path: '/admin/renewals', icon: 'bi-arrow-repeat', label: 'Renewals' },
    { path: '/admin/notifications', icon: 'bi-bell', label: 'Notifications' },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className="bi bi-grid-1x2" style={{ fontSize: '1.5rem', color: '#8C67FF' }}></i>
        </div> */}
        <div className="sidebar-header-text" style={{ marginTop: '0.75rem' }}>
          <h6 className="text-light mb-0 fw-bold">Admin Dashboard</h6>
          <small className="text-secondary">Executive Overview</small>
        </div>
      </div>

      <nav className="admin-sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <i className={`bi ${item.icon}`}></i>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-avatar">
          A
        </div>
        <div className="admin-user-info">
          <span className="admin-name">Admin User</span>
          <span className="admin-email">admin@example.com</span>
        </div>
      </div>
    </aside>
  );
};

