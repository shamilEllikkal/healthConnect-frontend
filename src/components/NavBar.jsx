import React, { useState } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [bar, setBar] = useState(false);

  return (
    <div className="w-full h-18 bg-white/90 backdrop-blur-[4px] border border-white/30  fixed px-16.5 max-md:px-5 flex items-center justify-between glass-effect z-20">
      <div className="flex items-center gap-3 ">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-2xl text-2xl text-white  ">
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <h1 className="font-bold text-text text-2xl  ">HealthConnect</h1>
      </div>
      <div className="flex gap-8 text-text-muted font-medium transition duration-300 ease-in-out max-lg:hidden  ">
        <Link
          className="hover:text-teal transition duration-300 ease-in-out "
          to="/"
        >
          Home
        </Link>
        <Link
          className="hover:text-teal transition duration-300 ease-in-out "
          to="#"
        >
          Doctors
        </Link>
        <Link
          className="hover:text-teal transition duration-300 ease-in-out"
          to="#"
        >
          Services
        </Link>
        <Link
          className="hover:text-teal transition duration-300 ease-in-out"
          to="#"
        >
          About
        </Link>
      </div>
      <div className="flex gap-4 max-lg:hidden max-sm ">
        <Link to="/login">
          {" "}
          <button className="hover:bg-[#14B8A6] w-18 text-[14px] h-10 rounded-2xl text-text-muted hover:text-white transition duration-350 ease-in-out  ">
            Sign In
          </button>{" "}
        </Link>
        <Link to="/signup">
          {" "}
          <button className="bg-[#14B8A6] w-26 text-[14px] h-10 rounded-2xl text-white hover:shadow-lg transition duration-250 ease-in-out ">
            Get Started
          </button>{" "}
        </Link>
      </div>
      <div className="text-xl text-text hidden max-lg:block ">
        {bar ? (
            <div className=" fixed inset-0 bg-black/40 z-40  min-h-dvh  " >
                  <div className="text-2xl bg-white w-65 px-5 pt-2 " ><FontAwesomeIcon icon={faXmark} onClick={()=> setBar(false)} /></div>
          <div className="flex flex-col items-center z-30 text-text-muted font-medium transition duration-300 ease-in-out bg-white w-65 top-0 right-0 gap-10 py-8  h-screen ">
          
            <Link
              className="hover:text-teal transition duration-300 ease-in-out "
              to="/"
            >
              Home
            </Link>
            <Link
              className="hover:text-teal transition duration-300 ease-in-out "
              to="#"
            >
              Doctors
            </Link>
            <Link
              className="hover:text-teal transition duration-300 ease-in-out"
              to="#"
            >
              Services
            </Link>
            <Link
              className="hover:text-teal transition duration-300 ease-in-out"
              to="#"
            >
              About
            </Link>
            <div className="flex gap-4  max-sm ">
        <Link to="/login">
          {" "}
          <button className="hover:bg-[#14B8A6] w-18 text-[14px] h-10 rounded-2xl text-text-muted hover:text-white transition duration-350 ease-in-out  ">
            Sign In
          </button>{" "}
        </Link>
        <Link to="/signup">
          {" "}
          <button className="bg-[#14B8A6] w-26 text-[14px] h-10 rounded-2xl text-white hover:shadow-lg transition duration-250 ease-in-out ">
            Get Started
          </button>{" "}
        </Link>
      </div>
          </div>
          </div>
        ) : (
          <FontAwesomeIcon onClick={()=>setBar(true)} icon={faBars} />
        )}
      </div>
    </div>
  );
};

export default NavBar;
