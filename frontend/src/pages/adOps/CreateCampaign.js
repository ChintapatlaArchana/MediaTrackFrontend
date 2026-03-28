import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import * as adOpsService from '../../services/adOpsService';

const CreateCampaign = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        campaignName: '',
        advertiser: '',
        startDate: '',
        endDate: '',
        budget: '',
        pacing: 'Even', 
        status: 'Planned', 
        creativeId: ''
    });

    /**
     * 1. Fetch ID when user finishes typing Advertiser name
     * 2. Trigger a browser prompt to show the fetched ID
     * 3. Allow user to confirm or manually enter the value
     */
    const handleAdvertiserBlur = async () => {
        if (!formData.advertiser) return;
        
        try {
            const res = await adOpsService.getCreativeIdByAdvertiser(formData.advertiser);
            // res.data is the ID from the backend
            const fetchedId = res.data;
            setFormData(prev => ({ ...prev, creativeId: fetchedId }));
            // const userInput = window.prompt(
            //     `Creative ID found for "${formData.advertiser}": ${fetchedId}\n\nPress OK to use this ID, or type a different one below:`, 
            //     fetchedId
            // );

            // If user clicked OK (userInput will be a string, even if empty)
            // if (userInput !== null) {
            //     setFormData(prev => ({ ...prev, creativeId: userInput }));
            // }
        } catch (error) {
            console.error("Creative lookup failed:", error);
            
            // Fallback: If no ID found, ask user to provide it manually via prompt
            // const manualId = window.prompt(
            //     `No Creative ID found for "${formData.advertiser}".\n\nPlease enter the Creative ID manually:`
            // );
            
            // if (manualId !== null) {
            //     setFormData(prev => ({ ...prev, creativeId: manualId }));
            // }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.creativeId) {
            alert("Please provide a valid Creative ID before saving.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name: formData.campaignName,
                advertiser: formData.advertiser,
                // Format: YYYY-MM-DDTHH:mm:ss
                startDate: formData.startDate ? `${formData.startDate}` : null,
                endDate: formData.endDate ? `${formData.endDate}` : null,
                budget: parseFloat(formData.budget) || 0,
                pacing: formData.pacing ? formData.pacing: "Even", 
                status: formData.status ? formData.status : "Planned",
                creativeId: parseInt(formData.creativeId, 10)
            };
            console.log(payload);
            await adOpsService.createCampaign(payload);
            alert(`Campaign Created Successfully!`);
            navigate('/adops');

        } catch (error) {
            console.error("Submission Error:", error);
            const errorMsg = error.response?.data?.message || "Failed to save Campaign. Check API/Security settings.";
            alert(`Error: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid" style={{ backgroundColor: '#0b0c10', color: '#f8f9fa', minHeight: '100vh', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
            <div className="d-flex align-items-center mb-4">
                <button onClick={() => navigate(-1)} className="btn btn-link text-white text-decoration-none p-0 me-3">
                    <FaArrowLeft size={20} />
                </button>
                <h1 className="mb-0" style={{ fontWeight: 700, fontSize: '2rem' }}>Create Campaign</h1>
            </div>
            
            <p className="mb-4" style={{ color: '#a0a0b0' }}>Connect an advertiser's creative to a live budget and schedule.</p>

            <div className="card" style={{ backgroundColor: '#171821', border: '1px solid #2a2a35', borderRadius: '12px' }}>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        
                        {/* Row 1: Name & Advertiser */}
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="form-label text-white">Campaign Name</label>
                                <input type="text" className="form-control" name="campaignName" value={formData.campaignName} onChange={handleChange} required
                                    style={{ backgroundColor: '#1e1f2b', border: '1px solid #2a2a35', color: 'white' }}
                                    placeholder="Summer Sale 2026" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label text-white">Advertiser Name</label>
                                <input type="text" className="form-control" name="advertiser" value={formData.advertiser} onChange={handleChange} onBlur={handleAdvertiserBlur} required
                                    style={{ backgroundColor: '#1e1f2b', border: '1px solid #2a2a35', color: 'white' }}
                                    placeholder="Enter exact advertiser name" />
                            </div>
                        </div>

                        {/* Row 2: Dates */}
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="form-label text-white">Start Date</label>
                                <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange} required
                                    style={{ backgroundColor: '#1e1f2b', border: '1px solid #2a2a35', color: 'white', colorScheme: 'dark' }} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label text-white">End Date</label>
                                <input type="date" className="form-control" name="endDate" value={formData.endDate} onChange={handleChange} required
                                    style={{ backgroundColor: '#1e1f2b', border: '1px solid #2a2a35', color: 'white', colorScheme: 'dark' }} />
                            </div>
                        </div>

                        {/* Row 3: Budget & Pacing */}
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="form-label text-white">Budget ($)</label>
                                <input type="number" min="0" className="form-control" name="budget" value={formData.budget} onChange={handleChange} required
                                    style={{ backgroundColor: '#1e1f2b', border: '1px solid #2a2a35', color: 'white' }}
                                    placeholder="5000" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label text-white">Pacing</label>
                                <select className="form-select" name="pacing" value={formData.pacing} onChange={handleChange}
                                    style={{ backgroundColor: '#1e1f2b', border: '1px solid #2a2a35', color: 'white' }}>
                                    <option value="Even">Even</option>
                                    <option value="Asap">Asap</option>
                                </select>
                            </div>
                        </div>

                        {/* Row 4: Status & Creative ID */}
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="form-label text-white">Status</label>
                                <select className="form-select" name="status" value={formData.status} onChange={handleChange}
                                    style={{ backgroundColor: '#1e1f2b', border: '1px solid #2a2a35', color: 'white' }}>
                                    <option value="Planned">Planned</option>
                                    <option value="Active">Active</option>
                                    <option value="Paused">Paused</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label text-white">Creative ID</label>
                                <input type="text" className="form-control" name="creativeId" value={formData.creativeId} onChange={handleChange}
                                    style={{ backgroundColor: '#1e1f2b', border: '1px solid #2a2a35', color: '#4b3fff', fontWeight: 'bold' }}
                                    placeholder="Fetch via Advertiser or enter manually" />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                            <button type="button" className="btn btn-outline-light me-3" onClick={() => navigate(-1)} style={{ borderColor: '#2a2a35', color: '#a0a0b0' }}>Cancel</button>
                            <button type="submit" className="btn text-white px-4" disabled={loading} style={{ background: 'linear-gradient(135deg, #4b3fff 0%, #764ba2 100%)', border: 'none' }}>
                                {loading ? 'Saving Campaign...' : 'Create Campaign'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCampaign;