import { Outlet,Navigate } from "react-router-dom";

const protectRouter = ()=>{
        const token=localStorage.getItem("token")
        return token ? <Outlet /> : <Navigate to='/login' />;

}

export default protectRouter;