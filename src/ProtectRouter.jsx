import { Outlet, Navigate } from "react-router-dom";
import axios from "./axiosInstance";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const ProtectRouter = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(`user/profile/${user?.id}`);
        if (res.data) {
          const tokenFromCookie = Cookies.get("token");
          setToken(tokenFromCookie);
        }
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setLoading(false);
      }
    };

    userData();
  });

  if (loading) return null;

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRouter;
