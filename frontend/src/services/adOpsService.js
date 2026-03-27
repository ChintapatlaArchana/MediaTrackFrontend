import axiosInstance from "../api/axiosInstance";

/**
 * Please adjust the ROOT paths below if your Controllers have a class-level 
 * @RequestMapping routing like "/api/campaigns" instead of just "/campaigns"
 */
const CAMPAIGN_ROOT = "/campaign";
const REPORT_ROOT = "/adDeliveryReport";

/**
 * 1. CREATE CAMPAIGN
 * Maps to @PostMapping("") in CampaignController
 */
export const createCampaign = async (campaignRequestDTO) => {
  const response = await axiosInstance.post(`${CAMPAIGN_ROOT}`, campaignRequestDTO);
  return response.data;
};

/**
 * 2. GET DASHBOARD CAMPAIGNS
 * Maps to @GetMapping("/dashboard") in CampaignController
 */
export const getDashboardCampaigns = async () => {
  const response = await axiosInstance.get(`${CAMPAIGN_ROOT}/dashboard`);
  return response.data;
};

export const getAllCampaignsWithMetrics = async () => {
  const response = await axiosInstance.get(`${CAMPAIGN_ROOT}`);
  return response.data;
};

/**
 * 3. GET ALL CAMPAIGNS
 * Maps to @GetMapping in CampaignController
 */
export const getAllCampaigns = async () => {
  const response = await axiosInstance.get(`${CAMPAIGN_ROOT}`);
  return response.data;
};

/**
 * 3. GET ACTIVE COUNT
 * Maps to @GetMapping("/active-count") in CampaignController
 */
export const getActiveCount = async () => {
  const response = await axiosInstance.get(`${CAMPAIGN_ROOT}/active-count`);
  return response.data;
};

/**
 * 4. GET DASHBOARD KPIs (Metrics)
 * Maps to @GetMapping("/metrics") in AdDeliveryReportController
 */
export const getDashboardKpis = async () => {
  const response = await axiosInstance.get(`${REPORT_ROOT}/stats/summary`);
  return response.data;
};

/**
 * 5. GET CHART DATA
 * Maps to @GetMapping("/charts") in AdDeliveryReportController
 */
export const getChartData = async () => {
  const response = await axiosInstance.get(`${REPORT_ROOT}/stats/chart`);
  return response.data;
};


export const getCreativeIdByAdvertiser = async (advertiser) => {
    return axiosInstance.get(`/creative/idAdvertiser`, { params: { advertiser } });
};