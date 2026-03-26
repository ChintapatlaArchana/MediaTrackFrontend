// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8082/", // ✅ backend base URL
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 10000,
// });

// export default axiosInstance;
import axios from "axios";

const API_URL = "http://localhost:8082";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Attach JWT token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // same key you use in adminService
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

