import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Link, Links ,useNavigate } from "react-router-dom";
import axios from "../axiosInstance.js";
import toast from 'react-hot-toast';


const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: yup.string().email("*Invalid email").required("*Email is required"),
  password: yup
    .string()
    .min(6, "*Password must be at least 6 characters")
    .required("*Password is required"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});


const Login = () => {


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

    const navigate = useNavigate();

  const onSubmit = (value) => {
    const {name,email,password} = value ;
   const data = {
    name:name,
    email:email,
    password:password
   }    
    axios.post('/auth/register',data).then((res)=>{
      console.log(res.data)
      localStorage.setItem("token",res.data.accessToken)
      localStorage.setItem("user",JSON.stringify(res.data.user))

       navigate("/login") 
    }).catch((err)=>{
console.log(err.response.data.message)
      
      toast.error("Error Occured")
console.log("an error occured" , err)
    })

    
    reset(); // Clear form
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  
  return (
    <div className=" w-full flex flex-col items-center gap-4 bg-[rgb(236,253,245)] min-h-dvh pb-10 justify-center max-sm:px-6 font-font ">
      <div className=" justify-start flex gap-2.5 text-[rgb(100,116,139)] w-md max-sm:w-2xs pt-5 hover:text-teal transition duration-150 ease-in-out ">
        <div>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div>
          <Link to={"/"}>Back to Home </Link>
        </div>
      </div>
      <div className="bg-white w-md h-full shadow-lg shadow-teal-500/10 rounded-lg flex flex-col items-center justify-between max-md:w-[448px] max-sm:w-full ">
        <div className="flex flex-col items-center p-[24px] w-full ">
          <div className="w-[64px] h-[64px] bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-2xl text-[32px] text-white ">
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="text-center mt-[13px]">
            <h1 className="font-bold text-3xl text-text">Join CareConnect</h1>
            <p className="text-sm text-text-muted mt-2">
              Start your healthcare journey with us
            </p>
          </div>
        </div>
        <div className="w-full pl-[24px] pr-[24px] ">
          <form onSubmit={handleSubmit(onSubmit)} noValidate action="">
            <div className="flex flex-col ">
              <label className="text-text/90  font-medium text-sm pb-4 ">
                Full Name
              </label>
              <input
                type="text"
                className="text-sm p-3.5 placeholder-gray-200 border-gray-300 rounded-xl border focus:ring-2 focus:outline-none focus:ring-teal text-text "
                {...register("name")}
                placeholder="Enter Your Full name"
              />
              <p className=" text-red-600 text-sm p-0.5 ">
                {errors.name?.message}
              </p>
            </div>
            <div className="flex flex-col ">
              <label className="text-text/90  font-medium text-sm py-4 ">
                Email Address
              </label>
              <input
                type="email"
                className=" text-sm p-3.5 placeholder-gray-200 border-gray-300 rounded-xl border focus:ring-2 focus:outline-none focus:ring-teal text-text "
                {...register("email")}
                placeholder="Enter Your Email"
              />
              <p className=" text-red-600 text-sm p-0.5 ">
                {errors.email?.message}
              </p>
            </div>
            <div className="flex flex-col  ">
              <label className="text-text/90 font-medium text-sm py-4 ">
                Password
              </label>
              <div className="relative">
                <input
                  className="  w-full  text-sm p-3.5 pr-11 placeholder-gray-200 border-gray-300 rounded-xl border focus:ring-2 focus:outline-none focus:ring-teal text-text "
                  {...register("password")}
                  placeholder="Enter Your Password"
                  type={showPassword ? "text" : "password"}
                />

                <div
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[50%] right-3.5 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <FontAwesomeIcon
                      className="text-text-muted hover:text-text transition duration-300 ease-in-out cursor-pointer "
                      icon={faEyeSlash}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="text-text-muted hover:text-text transition duration-300 ease-in-out  cursor-pointer "
                      icon={faEye}
                    />
                  )}
                </div>
              </div>
              <p className=" text-red-600 text-sm p-0.5 ">
                {errors.password?.message}
              </p>
            </div>
            <div className="flex flex-col  ">
              <label className="text-text/90 font-medium text-sm py-4 ">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="  w-full  text-sm p-3.5 pr-11 placeholder-gray-200 border-gray-300 rounded-xl border focus:ring-2 focus:outline-none focus:ring-teal text-text "
                  {...register("confirmPassword")}
                  placeholder="Enter Your Password"
                  type={showConfirm ? "text" : "password"}
                />

                <div
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute top-[50%] right-3.5 transform -translate-y-1/2"
                >
                  {showConfirm ? (
                    <FontAwesomeIcon
                      className="text-text-muted hover:text-text transition duration-300 ease-in-out cursor-pointer "
                      icon={faEyeSlash}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="text-text-muted hover:text-text transition duration-300 ease-in-out  cursor-pointer "
                      icon={faEye}
                    />
                  )}
                </div>
              </div>
              <p className=" text-red-600 text-sm p-0.5 ">
                {errors.confirmPassword?.message}
              </p>
            </div>
            <div className="py-4">
              <button className=" text-[18px] h-[48px] w-full text-white bg-gradient-to-br from-teal-400 to-teal-700 font-medium text-lg  py-2 px-4 rounded-xl hover:shadow-lg transition  duration-300 ease-in-out ">
                Create Account
              </button>
            </div>
          </form>
        </div>
        <div className="px-6 w-full">
          <div className="flex items-center w-full pb-4 justify-between">
            <div className="bg-teal h-[1px] w-[33.33333%] "></div>
            <div className=" text-text-muted text-sm max-sm:text-xs ">
              <p>Or continue with</p>
            </div>
            <div className="bg-teal h-[1px] w-[33.33333%] "></div>
          </div>
          <div className="  ">
            <button className="flex items-center justify-center w-full border-gray-300 border-1 p-3 rounded-2xl hover:shadow">
              <img src="/google.webp" alt="" className="w-5 h-5 mr-3 " />
              <h3 className="text-text/85 text-sm font-medium  ">
                Continue with Google
              </h3>
            </button>
          </div>
          <div className="flex items-center justify-center gap-1 p-4">
            <h3 className="text-text-muted text-base ">
              Already have an account?
            </h3>
            <Link className="text-teal text-base  hover:text-teal-700 transition duration-200 ease-in-out " to={"/login"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
