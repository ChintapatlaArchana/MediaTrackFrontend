import axiosInstance from "../api/axiosInstance";

export const getQCStatus = async () => {
  const response = await axiosInstance.get('/media/metrics');
  return response;
};

export const createTitle = async (data) => {
  const response = await axiosInstance.post('/titles/content/addTitle', data);
  return response;
};

export const createAsset = async (data) => {
  const response = await axiosInstance.post('/asset/content/addAsset', data);
  return response;
};

export const updateQuickTitle = async (id, data) => {
  const response = await axiosInstance.patch(`/titles/content/quickupdate/${id}`, data);
  return response;
};

export const getAllTitles = async () => {
  const response = await axiosInstance.get('/titles/content/getTitle');
  return response;
};

export const getTitleById = async (id) => {
  return axiosInstance.get(`/titles/content/${id}`);
};

export const getIdByTitle = async (name) => {
    return axiosInstance.get(`/titles/content/name`, { params: { name } });
}

export const getAllCategories = async () => {
  const response = await axiosInstance.get('/categories');
  return response;
};

export const getStatusCounts = async () => {
  // Matches your @GetMapping("/content/counts")
  // Note: Check if your Controller has a base @RequestMapping like '/titles'
  const response = await axiosInstance.get('/titles/content/counts'); 
  return response.data;
};

