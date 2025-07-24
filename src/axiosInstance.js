import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL:"https://healthconnect-backend-0yfr.onrender.com/api",
    // withCredentials: true,
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const token = Cookies.get("token")
        if(token){
            config.headers.Authorization = `bearer ${token}`
        }
       
        return config;
    },
    (error)=>Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response)=>response,
    (error)=>{
            if(error.response?.status=== 401){
                console.warn("Unautherized , redicting to login.....");
               Cookies.remove("token", { path: "/" });
                window.location.href = "/"
            }
            return Promise.reject(error)
    }
)

export default axiosInstance;