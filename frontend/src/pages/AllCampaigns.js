import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { getAllCampaignsWithMetrics } from '../services/adOpsService'; 

const AllCampaigns = () => {
    const navigate = useNavigate();
    const [allCampaigns, setAllCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const res = await getAllCampaignsWithMetrics(); 
                console.log(res);
                
                if (res && res.length > 0) {
                    const mapped = res.map((c, i) => {
                        return {
                            id: c.campaignId || i,
                            name: c.name || 'Unnamed Campaign',
                            advertiser: c.advertiser,
                            status: c.status || 'ACTIVE',
                            totalBudget: c.budget || 0,
                            thumb: `https://picsum.photos/id/${400 + i}/150/150`
                        };
                    });
                    setAllCampaigns(mapped);
                }
            } catch (error) {
                console.warn("Could not fetch campaign data from backend", error);
            }
        };
        fetchCampaigns();
    }, []);

    return (
        <div className="container-fluid" style={{ background: 'radial-gradient(circle at top, #0f172a, #020617)', color: '#e5e7eb', minHeight: '100vh', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
            <div className="d-flex align-items-center mb-4">
                <button 
                    onClick={() => navigate(-1)} 
                    className="btn btn-link text-white text-decoration-none p-0 me-3"
                >
                    <FaArrowLeft size={20} />
                </button>
                <h1 className="mb-0" style={{ fontWeight: 700, fontSize: '2rem', color: '#fff' }}>All Campaigns</h1>
            </div>
            
            <p className="mb-4" style={{ color: '#9ca3af' }}>
                Full list of your active, paused, and ended campaigns retrieved from your database.
            </p>

            <div className="card" style={{ backgroundColor: '#020617', border: '1px solid #1f2937', borderRadius: '16px' }}>
                <div className="card-header border-0 py-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#0b1220', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', borderBottom: '1px solid #1f2937' }}>
                    <h5 className="mb-0 text-white" style={{ fontWeight: 600 }}>Campaign Directory</h5>
                    
                    {/* <div className="input-group" style={{ width: '300px' }}>
                        <span className="input-group-text border-0" style={{ backgroundColor: '#1f2937', color: '#9ca3af' }}>
                            <FaSearch />
                        </span>
                        <input type="text" className="form-control border-0" placeholder="Search campaigns..." style={{ backgroundColor: '#1f2937', color: '#fff' }} />
                    </div> */}
                </div>

                <div className="card-body p-4">
                    {allCampaigns.map(campaign => {
                        let statusClass = 'status-paused';
                        if (campaign.status === 'ACTIVE' || campaign.status === 'Active') statusClass = 'status-active';
                        else if (campaign.status === 'COMPLETED' || campaign.status === 'Completed' || campaign.status === 'ENDED') statusClass = 'text-muted border-secondary';
                        else if (campaign.status === 'PLANNED' || campaign.status === 'Planned') statusClass = 'text-info border-info';

                        return (
                            <div className="card mb-3" key={campaign.id} style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: '12px', transition: 'all 0.2s ease', cursor: 'pointer' }}>
                                <div className="card-body p-3">
                                    <div className="row align-items-center">
                                        {/* Left Side: Image and Name */}
                                        <div className="col-12 col-md-8 d-flex align-items-center">
                                            <img src={campaign.thumb} alt={campaign.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', marginRight: '16px', backgroundColor: '#1f2937' }} />
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px', color: '#e5e7eb' }}>{campaign.name}</div>
                                                <span style={{ fontSize: '10px', padding: '4px 10px', borderRadius: '6px', fontWeight: 600, textTransform: 'uppercase' }} className={`status-badge ${statusClass}`}>
                                                    {campaign.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right Side: Total Budget Only */}
                                        <div className="col-12 col-md-4 text-md-end mt-3 mt-md-0">
                                            <span style={{ color: '#9ca3af', fontSize: '12px', display: 'block' }}>Total Budget</span>
                                            <span style={{ fontWeight: 600, fontSize: '16px', color: '#e5e7eb' }}>
                                                Rs.{campaign.totalBudget.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AllCampaigns;