import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBolt, FaBullseye, FaChartBar, FaEye, FaMousePointer, FaDollarSign } from 'react-icons/fa';
import { getDashboardKpis, getActiveCount, getDashboardCampaigns } from '../services/adOpsService';
import { MediaTrackLogo } from './MediaTrackLogo';
import './AdOpsManager.css';

const AdOpsManager = () => {
    const navigate = useNavigate();

    // State bindings
    const [kpiData, setKpiData] = useState({
        impressions: '0',
        ctr: '0%',
        ecpm: '$0',
        activeCampaigns: '0',
        trends: {
            impressions: '',
            ctr: '',
            ecpm: '',
            activeCampaigns: ''
        }
    });

    const [activeCampaigns, setActiveCampaigns] = useState([]);

    // Format numbers dynamically for database payloads (from 1500000 to "1.5M")
    const formatNumber = (num, isPercent = false, isCurrency = false) => {
        if (!num) return isPercent ? '0%' : (isCurrency ? '$0' : '0');
        if (isPercent) return num.toFixed(2) + '%';
        if (isCurrency) return 'Rs.' + num.toFixed(2);
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    // Load data from backend APIs on mount
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Safely fire off parallel API promises securely connected to your backend!
                const [kpiRes, countRes, campaignsRes] = await Promise.all([
                    getDashboardKpis().catch(() => null),
                    getActiveCount().catch(() => null),
                    getDashboardCampaigns().catch(() => null)
                ]);

                // Update KPIs if database hit was successful
                if (kpiRes || countRes !== null) {
                    setKpiData(prev => ({
                        ...prev,
                        impressions: (kpiRes && kpiRes.totalImpressions != null) ? formatNumber(kpiRes.totalImpressions) : '',
                    
                        ctr: (kpiRes && kpiRes.ctr != null) ? formatNumber(kpiRes.ctr, true) : '',
                        ecpm: (kpiRes && kpiRes.ecpm != null) ? formatNumber(kpiRes.ecpm, false, true) : '',
                        //ctr : kpiRes.ctr,
                        //ecpm: kpiRes.ecpm,
                        activeCampaigns: countRes !== null ? countRes.toString() : '',
                        trends: {
                            ...prev.trends,
                            impressions: (kpiRes && kpiRes.impressionGrowth != null) ? kpiRes.impressions : ''
                        }
                        
                    
                    }));
                }

                // Update Campaigns if database hit was successful
                if (campaignsRes && campaignsRes.length > 0) {
                    const mappedCampaigns = campaignsRes.map((c, i) => ({
                        id: c.campaignId || i,
                        name: c.name ,
                        status: c.status ,
                        // impressions: c.impressions ? formatNumber(c.impressions) : '0',
                        // clicks: c.clicks ? formatNumber(c.clicks) : '0',
                        // ctr: c.ctr ? formatNumber(c.ctr, true) : '0%',
                        // totalBudget: c.budget || 0,
                        // spentAmount: c.spentAmount || 0,
                        thumb: `https://picsum.photos/id/${400 + i}/150/150` // Automatically generating new thumbs based on DB indexes!
                    }));
                    setActiveCampaigns(mappedCampaigns);
                }
            } catch (error) {
                console.warn("Backend not reachable or still booting up, safely falling back to beautiful Mock layouts.");
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="ad-ops-manager container-fluid">
            {/* Page Header (Fixed/Sticky) */}
            <div className="static-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 className="page-title">Ad Ops Manager</h1>
                    <hr className="header-divider" />
                    <p className="page-subtitle">Campaign setup, targeting, and performance analytics</p>
                </div>
                <div style={{ paddingRight: '20px' }}>
                    <MediaTrackLogo size={40} showText={true} gap={12}/>
                </div>
            </div>

            {/* Action Cards Section */}
            <div className="row g-4 mb-5">
                <div className="col-12 col-md-6">
                    <Link to="/campaigns/create" className="card-link-wrapper">
                        <div className="card action-card">
                            <div className="card-body action-card-body">
                                <FaBolt className="action-icon" />
                                <h5 className="action-title">Create Campaign</h5>
                                <p className="action-subtitle mb-0">Launch new ad campaign</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-12 col-md-6">
                    <Link to="/reports/view" className="card-link-wrapper">
                        <div className="card action-card">
                            <div className="card-body action-card-body">
                                <FaChartBar className="action-icon" />
                                <h5 className="action-title">View Reports</h5>
                                <p className="action-subtitle mb-0">Detailed analytics</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* KPI Summary Cards Section */}
            <div className="row g-3 g-md-4 mb-5">
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="kpi-card">
                        <div className="kpi-icon-wrapper">
                            <FaEye />
                        </div>
                        <div className="kpi-content">
                            <div className="kpi-label">Total Impressions</div>
                            <div className="kpi-value">
                                {kpiData.impressions}
                                <span className="trend-positive">{kpiData.trends.impressions}</span>
                            </div>
                            {/* <div className="kpi-desc">Total Impressions</div> */}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="kpi-card">
                        <div className="kpi-icon-wrapper">
                            <FaMousePointer />
                        </div>
                        <div className="kpi-content">
                            <div className="kpi-label">Click-Through Rate (CTR)</div>
                            <div className="kpi-value">
                                {kpiData.ctr}
                                <span className="trend-positive">{kpiData.trends.ctr}</span>
                            </div>
                            {/* <div className="kpi-desc">Click-Through Rate (CTR)</div> */}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="kpi-card">
                        <div className="kpi-icon-wrapper">
                            <FaDollarSign />
                        </div>
                        <div className="kpi-content">
                            <div className="kpi-label">eCPM</div>
                            <div className="kpi-value">
                                {kpiData.ecpm}
                                <span className="trend-positive">{kpiData.trends.ecpm}</span>
                            </div>
                            {/* <div className="kpi-desc">eCPM</div> */}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="kpi-card">
                        <div className="kpi-icon-wrapper">
                            <FaBullseye />
                        </div>
                        <div className="kpi-content">
                            <div className="kpi-label">Active Campaigns</div>
                            <div className="kpi-value">
                                {kpiData.activeCampaigns}
                                <span className="trend-neutral" style={{ color: '#a0a0b0', fontSize: '0.85rem' }}>{kpiData.trends.activeCampaigns}</span>
                            </div>
                            {/* <div className="kpi-desc">Active Campaigns</div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Campaigns Section */}
            <div className="active-campaigns-wrapper">
                <div className="active-campaigns-content">
                    <div className="section-header">
                        <h4 className="section-title text-white">Active Campaigns</h4>
                        <Link to="/campaigns/all" className="view-all-link">View All</Link>
                    </div>

                    <div className="campaign-list">
                        {activeCampaigns.map(campaign => {
                            const spendPercent = Math.min((campaign.spentAmount / campaign.totalBudget) * 100, 100);
                            
                            return (
                                <div className="card campaign-card" key={campaign.id} onClick={() => navigate(`/campaigns/${campaign.id}`)}>
                                    <div className="row align-items-center">
                                        {/* Left Section */}
                                        <div className="col-12 col-md-4 campaign-info mb-3 mb-md-0">
                                            <img src={campaign.thumb} alt={campaign.name} className="campaign-thumb" />
                                            <div>
                                                <div className="campaign-name">{campaign.name}</div>
                                                <span className={`status-badge ${
                                                    (campaign.status === 'ACTIVE' || campaign.status === 'Active') ? 'status-active' : 
                                                    (campaign.status === 'COMPLETED' || campaign.status === 'Completed') ? 'text-muted border-secondary' : 
                                                    (campaign.status === 'PLANNED' || campaign.status === 'Planned') ? 'text-info border-info' : 
                                                    'status-paused'
                                                }`}>
                                                    {campaign.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Middle Metrics Section
                                        <div className="col-12 col-md-4 d-flex justify-content-between mb-3 mb-md-0 px-md-4">
                                            <div className="metric-group">
                                                <div className="metric-label">Impressions</div>
                                                <div className="metric-val">{campaign.impressions}</div>
                                            </div>
                                            <div className="metric-group">
                                                <div className="metric-label">Clicks</div>
                                                <div className="metric-val">{campaign.clicks}</div>
                                            </div>
                                            <div className="metric-group">
                                                <div className="metric-label">CTR</div>
                                                <div className="metric-val text-primary" style={{ color: '#4b3fff' }}>{campaign.ctr}</div>
                                            </div>
                                        </div> */}

                                        {/* Right Metrics Section */}
                                        {/* <div className="col-12 col-md-4 budget-info">
                                            <div className="d-flex justify-content-between">
                                                <div className="budget-label text-start">Budget</div>
                                                <div className="budget-val">${campaign.totalBudget.toLocaleString()}</div>
                                            </div>
                                            <div className="progress-container mt-1">
                                                <div className="budget-label text-start mb-1">Budget Spent</div>
                                                <div className="progress">
                                                    <div 
                                                        className="progress-bar" 
                                                        role="progressbar" 
                                                        style={{ width: `${spendPercent}%` }} 
                                                        aria-valuenow={spendPercent} 
                                                        aria-valuemin="0" 
                                                        aria-valuemax="100"
                                                    ></div>
                                                </div>
                                                <span className="progress-text">
                                                    ${campaign.spentAmount.toLocaleString()} / ${campaign.totalBudget.toLocaleString()}
                                                </span>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdOpsManager;
