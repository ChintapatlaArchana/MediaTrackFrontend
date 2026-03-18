import axiosInstance from "./axiosInstance";

/**
 * OPERATOR – PLATFORM OVERVIEW
 * GET /api/operator/overview
 */
export const getPlatformOverview = async () => {
  const response = await axiosInstance.get("/operator/overview");
  return response.data;
};

/**
 * OPERATOR – SYSTEM HEALTH
 * GET /api/operator/health
 */
export const getSystemHealth = async () => {
  const response = await axiosInstance.get("/operator/health");
  return response.data;
};

/**
 * OPERATOR – INGEST DETAILS
 * GET /api/operator/ingest
 */
export const getIngestDetails = async () => {
  const response = await axiosInstance.get("/operator/ingest");
  return response.data;
};

/**
 * OPERATOR – CDN STATUS
 * GET /api/operator/cdn
 */
export const getCdnStatus = async () => {
  const response = await axiosInstance.get("/operator/cdn");
  return response.data;
};

/**
 * OPERATOR – DRM STATUS
 * GET /api/operator/drm
 */
export const getDrmStatus = async () => {
  const response = await axiosInstance.get("/operator/drm");
  return response.data;
};