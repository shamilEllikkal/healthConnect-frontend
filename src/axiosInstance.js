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
      config.headers.Authorization = `Bearer ${token}`; // Capital B
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      Cookies.get("refresh")
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refresh");
        const res = await axios.post(
          "https://healthconnect-backend-0yfr.onrender.com/api/auth/refresh",
          { refreshToken }
        );
        const newAccessToken = res.data.accessToken;
        Cookies.set("token", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        Cookies.remove("token", { path: "/" });
        Cookies.remove("refresh", { path: "/" });
        window.location.href = "/"; // Redirect to login
        return Promise.reject(refreshError);
      }
    }  else {
      // Only redirect if NOT an OTP or auth endpoint
      const url = originalRequest.url || "";
      if (
        !url.includes("/auth/verifyotp") &&
        !url.includes("/auth/forgotpassword") &&
        !url.includes("/auth/resetpassword")
      ) {
        Cookies.remove("token", { path: "/" });
        Cookies.remove("refresh", { path: "/" });
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
