import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://healthconnect-backend-0yfr.onrender.com/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = Cookies.get("refresh");

    // 🔐 Handle 401 with refresh token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;
      try {
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
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 401) {
      const url = originalRequest.url || "";
      const isOtpOrAuthRoute =
        url.includes("/auth/verifyotp") ||
        url.includes("/auth/forgotpassword") ||
        url.includes("/auth/resetpassword");

      if (!isOtpOrAuthRoute) {
        Cookies.remove("token", { path: "/" });
        Cookies.remove("refresh", { path: "/" });
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
