
import { faBell,faBars  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useVisibilityStore from "../store/barStore";

const DashboardNav = () => {

const toggleVisibility = useVisibilityStore((state)=>state.toggleVisibility);


  const user = JSON.parse(localStorage.getItem("user"));


  

  const properName = user.name.charAt(0).toUpperCase()+(user.name.slice(1).toLowerCase());

  return (
 <div className="flex gap-5 justify-between  fixed z-9 h-16 w-full bg-white  ">
    <div className="flex gap-5">
            <div className="relative w-11  flex items-center justify-center text-text ">
              <div className="text-xl">
                {" "}
                <FontAwesomeIcon icon={faBell} />
              </div>

              <div className="w-3 h-3 bg-teal rounded-2xl absolute top-2 -right-1"></div>
            </div>
       <Link className="flex  gap-2.5 items-center" to="/dashboard/profile">  
              <div className="">
             <img className="w-9 h-9 rounded-3xl flex items-center justify-cente" src={user.profile} alt="" />
              </div>
              <div>
                <h1 className="text-text text-sm  font-medium">{properName}</h1>
              </div>
            </Link> </div>
            <div onClick={toggleVisibility} className="self-center max-sm:block pr-5 hidden  ">
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
 
  )
}

export default DashboardNav
