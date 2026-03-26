import axios from "axios";

const API_URL = "http://localhost:8082";

// Set auth header for all requests (same as adminService)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

/**
 * OPERATOR – PLATFORM OVERVIEW METRICS (8082)
 */
export const operatorService={
getIngestMetrics: async () => {
  const response = await axios.get(`${API_URL}/ingest/metrics`, getAuthHeaders());
  return response.data;
},
 getPackagingMetrics :async () => {
  const response = await axios.get(`${API_URL}/media/metrics`, getAuthHeaders());
  return response.data;
},

getCDNMetrics:async () => {
  const response = await axios.get(`${API_URL}/cdn/metrics`, getAuthHeaders());
  return response.data;
},

getDRMMetrics :async () => {
  const response = await axios.get(`${API_URL}/drm/metrics`, getAuthHeaders());
  return response.data;
},

/**
 * OPERATOR – SYSTEM HEALTH METRICS (8082)
 */
 getIngestHealth :async () => {
  const response = await axios.get(`${API_URL}/transcode/metrics/health`, getAuthHeaders());
  return response.data;
},
 getPackagingHealth : async () => {
  const response = await axios.get(`${API_URL}/media/metrics/health`, getAuthHeaders());
  return response.data;
},

 getCDNHealth : async () => {
  const response = await axios.get(`${API_URL}/cdn/metrics/health`, getAuthHeaders());
  return response.data;
},

getDRMHealth : async () => {
  const response = await axios.get(`${API_URL}/drm/metrics/health`, getAuthHeaders());
  console.log(response.data);
  return response.data;
},

/**
 * OPERATOR – CDN SPECIFIC (8082)
 */
getCDNActiveCount : async () => {
  const response = await axios.get(`${API_URL}/cdn/active`, getAuthHeaders());
  return response.data; // Expected: number or { count: x }
},

 getCDNTotalCount :async () => {
  const response = await axios.get(`${API_URL}/cdn/total`, getAuthHeaders());
  return response.data;
},

 getCDNAvgLatency : async () => {
  const response = await axios.get(`${API_URL}/cdn/average-latency`, getAuthHeaders());
  return response.data;
},

 getCDNRegionPerformance :async (region) => {
  const response = await axios.get(`${API_URL}/cdn/region/${region}`, getAuthHeaders());
  return response.data;
},

/**
 * OPERATOR – PACKAGING SPECIFIC (8082)
 */
 getMediaFormatDistribution :async () => {
  const response = await axios.get(`${API_URL}/media/metrics/format-distribution`, getAuthHeaders());
  return response.data;
},

getMediaStatusDistribution :async () => {
  const response = await axios.get(`${API_URL}/media/metrics/status-distribution`, getAuthHeaders());
  return response.data;
},

/**
 * OPERATOR – DRM SPECIFIC (8082)
 */
 getDRMGranted :async () => {
  const response = await axios.get(`${API_URL}/drm/granted`, getAuthHeaders());
  return response.data;
},

getDRMDenied : async () => {
  const response = await axios.get(`${API_URL}/drm/denied`, getAuthHeaders());
  return response.data;
},

getDRMExpired : async () => {
  const response = await axios.get(`${API_URL}/drm/expired`, getAuthHeaders());
  return response.data;
},

 getDRMSuccessRate :async () => {
  const response = await axios.get(`${API_URL}/drm/success-rate`, getAuthHeaders());
  return response.data;
},

getDRMDistribution : async () => {
  const response = await axios.get(`${API_URL}/drm/distribution`, getAuthHeaders());
  return response.data;
},
getDRMEvents :async (type = "All DRM Types", status = "All Status") => {
  const response = await axios.get(`${API_URL}/drm/events`, getAuthHeaders());
  return response.data;
},

getDRMActivity :async () => {
  const response = await axios.get(`${API_URL}/drm/all`, getAuthHeaders());
  return response.data;
},
 getIngestJobs :async () => {
  const response = await axios.get(`${API_URL}/ingest/all`, getAuthHeaders());
  return response.data;
},

 getPackagingJobs : async () => {
  const response = await axios.get(`${API_URL}/media`, getAuthHeaders());
  return response.data;
},

  getAllCDNNodes: async () => {
    const response = await axios.get(`${API_URL}/cdn/all`, getAuthHeaders());
    return response.data;
  },



 


};