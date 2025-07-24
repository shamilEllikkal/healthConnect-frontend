import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://healthconnect-backend-0yfr.onrender.com/api",
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      Cookies.get("refresh")
    ) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refresh");
      const res = axios.post("https://your-api.com/api/auth/refresh", {
        refreshToken,
      });

      const newAccessToken = res.data.accessToken;

      // Update cookie
      Cookies.set("token", newAccessToken);

      // Retry original request
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } else {
      console.warn("Unautherized , redicting to login.....");
      Cookies.remove("token", { path: "/" });
      Cookies.remove("refresh", { path: "/" });
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
