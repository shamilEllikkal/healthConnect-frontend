import React, {  } from "react";
import { faHeart, faCalendar } from "@fortawesome/free-regular-svg-icons";
import {
  faHouse,
  faBookOpen,
  faUser,
  faGear,faRightFromBracket,faXmark

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, Outlet } from "react-router-dom";
import useVisibilityStore from "../store/barStore";
import Cookies from "js-cookie";

const Dashboard = () => {
  
  const isVisible = useVisibilityStore((state)=>state.isVisible)
  const toggleVisibility = useVisibilityStore((state)=>state.toggleVisibility);

  const handleSignout = ()=>{
   Cookies.remove("token", { path: "/" });
     localStorage.removeItem("user")
     
   
  }


  return (
    <>
    <div  className={isVisible ? "" : "max-sm:bg-black/10 max-sm:backdrop-blur-sm z-100 max-sm:w-full max-sm:min-h-dvh max-sm:fixed"}>
 <div className={isVisible ? "max-sm:hidden z-90" : "block"} > <div className="w-64 flex flex-col min-h-dvh justify-between fixed z-10 bg-white   ">
        <div className="flex justify-between px-3 ">
          <div className="flex items-center gap-3 h-16">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-xl text-lg text-white  ">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <h1 className="font-bold text-text text-xl  ">HealthConnect</h1>
          </div>
          <div onClick={toggleVisibility} className="self-center text-text/80 text-xl hidden max-sm:block">
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="space-y-2 px-4 py-6 group fixed top-15 w-64">
         <NavLink onClick={toggleVisibility}
            to="/dashboard/bookappointment" end
            className={({ isActive }) => `flex items-center text-sm gap-3 font-medium  h-11 px-4 py-3 rounded-2xl transfrom duration-300 ease-in-out
              ${isActive
                ? " text-white bg-teal "
                : " text-text-muted hover:text-text"
            }`}
          >
            <FontAwesomeIcon className="text-xl" icon={faHouse} />
            <span>Dashboard</span>
          </NavLink>
       <NavLink  onClick={toggleVisibility}
            to="/dashboard/bookappointment" end
            className={({ isActive }) => `flex items-center text-sm gap-3 font-medium  h-11 px-4 py-3 rounded-2xl transfrom duration-300 ease-in-out
              ${isActive
                ? " text-white bg-teal "
                : " text-text-muted hover:text-text"
            }`}
          >
            <FontAwesomeIcon className="text-xl" icon={faBookOpen} />
            <span>Book Appointments</span>
          </NavLink>
          <NavLink  onClick={toggleVisibility}
            to="/dashboard/myappointment" end
            className={({ isActive }) => `flex items-center text-sm gap-3 font-medium  h-11 px-4 py-3 rounded-2xl transfrom duration-300 ease-in-out
              ${isActive
                ? " text-white bg-teal "
                : " text-text-muted hover:text-text"
            }`}
          >
            <FontAwesomeIcon className="text-xl" icon={faCalendar} />
            <span>My Appointment</span>
          </NavLink>
         <NavLink  onClick={toggleVisibility}
            to="/dashboard/profile"
            className={({ isActive }) => `flex items-center text-sm gap-3 font-medium  h-11 px-4 py-3 rounded-2xl transfrom duration-300 ease-in-out
              ${isActive
                ? " text-white bg-teal "
                : " text-text-muted hover:text-text"
            }`}
          >
            <FontAwesomeIcon className="text-xl" icon={faUser} />
            <span>Profile</span>
          </NavLink>
          <NavLink  onClick={toggleVisibility}
            to="/dashboard/settings"
            className={({ isActive }) => `flex items-center text-sm gap-3 font-medium  h-11 px-4 py-3 rounded-2xl transfrom duration-300 ease-in-out
              ${isActive
                ? " text-white bg-teal "
                : " text-text-muted hover:text-text"
            }`}
          >
            <FontAwesomeIcon className="text-xl" icon={faGear } />
            <span>Settings</span>
          </NavLink>
        </div>
        <div className="space-y-2 fixed bottom-0 px-4 py-6 w-64">
         <NavLink onClick={toggleVisibility && handleSignout}
            to="/"
            className={({ isActive }) => `flex items-center text-sm gap-3 font-medium  h-11 px-4 py-3 rounded-2xl transfrom duration-300 ease-in-out
              ${isActive
                ? " text-white bg-teal "
                : " text-text-muted hover:text-text"
            }`}
          >
            <FontAwesomeIcon className="text-xl" icon={ faRightFromBracket} />
            <span>Sign Out</span>
          </NavLink>
        </div>
      </div>
      </div>
   </div> 
     
      <div> <Outlet /> </div>
    </>
  );
};

export default Dashboard;
