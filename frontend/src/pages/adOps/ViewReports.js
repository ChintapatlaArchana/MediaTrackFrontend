import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaChartLine } from 'react-icons/fa';
import { getChartData } from '../../services/adOpsService';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ViewReports = () => {
    const navigate = useNavigate();

    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const res = await getChartData();
                if (res && res.length > 0) {
                    setReportData(res);
                }
            } catch (error) {
                console.warn("Could not fetch chart data from backend");
            }
        };
        fetchChartData();
    }, []);

    // Format numbers compactly for Y axis mappings
    const DataFormater = (number) => {
        if(number > 1000000) {
            return (number/1000000).toString() + 'M';
        } else if(number > 1000) {
            return (number/1000).toString() + 'K';
        }
        return number.toString();
    }

    return (
        <div className="container-fluid" style={{ backgroundColor: '#0b0c10', color: '#f8f9fa', minHeight: '100vh', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
            <div className="d-flex align-items-center mb-4">
                <button 
                    onClick={() => navigate(-1)} 
                    className="btn btn-link text-white text-decoration-none p-0 me-3"
                >
                    <FaArrowLeft size={20} />
                </button>
                <div className="d-flex align-items-center">
                    <FaChartLine size={28} className="me-3" color="#4b3fff" />
                    <h1 className="mb-0" style={{ fontWeight: 700, fontSize: '2rem' }}>Performance Reports</h1>
                </div>
            </div>
            
            <div className="card shadow-lg" style={{ backgroundColor: '#171821', border: '1px solid #2a2a35', borderRadius: '12px' }}>
                <div className="card-header border-0 py-3" style={{ backgroundColor: '#1e1f2b', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', borderBottom: '1px solid #2a2a35' }}>
                    <h5 className="mb-0 text-white" style={{ fontWeight: 600 }}>Combined Analytics: Impressions vs CTR</h5>
                </div>
                <div className="card-body p-4 p-md-5">
                    
                    <div style={{ width: '100%', height: '400px' }}>
                        <ResponsiveContainer>
                            <ComposedChart
                                data={reportData}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 20,
                                    left: 20,
                                }}
                            >
                                <CartesianGrid stroke="#2a2a35" strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" stroke="#a0a0b0" tick={{ fill: '#a0a0b0' }} />
                                
                                {/* Left Y Axis for Impressions (Bar) */}
                                <YAxis 
                                    yAxisId="left" 
                                    tickFormatter={DataFormater} 
                                    stroke="#a0a0b0" 
                                    tick={{ fill: '#a0a0b0' }} 
                                    axisLine={false} 
                                    tickLine={false} 
                                />
                                
                                {/* Right Y Axis for CTR (Line) */}
                                <YAxis 
                                    yAxisId="right" 
                                    orientation="right" 
                                    stroke="#a0a0b0" 
                                    tick={{ fill: '#a0a0b0' }}
                                    tickFormatter={(v) => `${v}%`} 
                                    axisLine={false} 
                                    tickLine={false} 
                                />

                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e1f2b', border: '1px solid #2a2a35', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                
                                {/* Bar Graph for Impressions */}
                                <Bar 
                                    yAxisId="left" 
                                    dataKey="impressions" 
                                    fill="url(#colorUv)" 
                                    radius={[4, 4, 0, 0]} 
                                    barSize={40}
                                    name="Ad Impressions"
                                />
                                
                                {/* Line Graph for CTR */}
                                <Line 
                                    yAxisId="right" 
                                    type="monotone" 
                                    dataKey="ctr" 
                                    stroke="#00d27a" 
                                    strokeWidth={3}
                                    dot={{ r: 5, fill: '#00d27a', strokeWidth: 0 }}
                                    activeDot={{ r: 8 }}
                                    name="Click-Through Rate (%)"
                                />

                                {/* Gradient Definition for Bar */}
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#764ba2" stopOpacity={0.9}/>
                                        <stop offset="95%" stopColor="#4b3fff" stopOpacity={0.8}/>
                                    </linearGradient>
                                </defs>

                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>
            
        </div>
    );
};

export default ViewReports;