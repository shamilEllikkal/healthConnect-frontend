import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://healthconnect-backend-0yfr.onrender.com/api",
    // withCredentials: true,
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token")
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
                localStorage.removeItem("token");
                window.location.href = "/"
            }
            return Promise.reject(error)
    }
)

export default axiosInstance;