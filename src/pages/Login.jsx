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
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import toast from "react-hot-toast";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";


const schema = yup.object().shape({
  email: yup.string().email("*Invalid email").required("*Email is required"),
  password: yup
    .string()
    .min(6, "*Password must be at least 6 characters")
    .required("*Password is required"),
});

const Login = () => {

  const [authLoading,setAuthLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onGoogleSubmit = async(data)=>{
    setAuthLoading(true)
    console.log(data)
    const {email,sub} = data;
    const value = {email:email,password:sub}
  await axios.post("/auth/login",value).then((res)=>{
     Cookies.set("token", res.data.accessToken, {
  expires: 1, // expires in 1 day
  path: "/",
  secure: true,
  sameSite: "Strict",
})
      localStorage.setItem("user", JSON.stringify(res.data.user));
       if( res.data.user.role=== "admin"){
      navigate("/admin")
    }else{
      navigate("/dashboard/bookappointment");}
      toast.success("Logined successfully.");
    }).catch((err)=>{
      console.log(err.response.data)
      toast.error("User not Found")
  })
  setAuthLoading(false)
  }


  const onSubmit = async (data) => {
    // console.log(data)
    setAuthLoading(true)
 await axios.post("/auth/login", data  ).then((res) => {
 Cookies.set("token", res.data.accessToken, {
path: "/",
})
      localStorage.setItem("user", JSON.stringify(res.data.user));
    if( res.data.user.role=== "admin"){
      navigate("/admin")
    }else{
      navigate("/dashboard/bookappointment");}
      toast.success("Logined successfully.");
    }).catch((err)=>{
      console.log(err.response?.data)
      toast.error("User not Found")
    })
    reset(); // Clear form
    setAuthLoading(false)
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className=" w-full flex flex-col items-center gap-4 bg-[rgb(236,253,245)] min-h-dvh pb-10 justify-center max-sm:px-6 font-font ">
      <div className=" justify-start flex gap-2.5 text-[rgb(100,116,139)] pt-5 w-md max-sm:w-2xs hover:text-teal transition duration-150 ease-in-out ">
        <div>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div>
          <Link className="" to={"/"}>
            Back to Home{" "}
          </Link>
        </div>
      </div>
      <div className="bg-white w-md h-full shadow-lg shadow-teal-500/10 rounded-lg flex flex-col items-center justify-between max-md:w-[448px] max-sm:w-full ">
        <div className="flex flex-col items-center p-[24px] w-full ">
          <div className="w-[64px] h-[64px] bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-2xl text-[32px] text-white ">
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="text-center mt-[13px]">
            <h1 className="font-bold text-3xl text-text">Welcome Back</h1>
            <p className="text-sm text-text-muted mt-2">
              Sign in to continue your wellness journey
            </p>
          </div>
        </div>
        <div className="w-full pl-[24px] pr-[24px] ">
          <form onSubmit={handleSubmit(onSubmit)} noValidate action="">
            <div className="flex flex-col ">
              <label className="text-text/90  font-medium text-sm ">
                Email Address
              </label>
              <input
                type="email"
                className="mt-[16px] text-sm p-3.5 placeholder-gray-200 border-gray-300 rounded-xl border focus:ring-2 focus:outline-none focus:ring-teal text-text "
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
            <div className="flex justify-between py-4 ">
              <div className="flex gap-[3px]  ">
                <input
                  type="checkbox"
                  className=" accent-teal-600   "
                  id="tick"
                />
                <label
                  htmlFor="tick"
                  className="text-sm text-[rgb(100,116,139)]   "
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-teal text-[14px] font-medium hover:text-teal-600 transition duration-300 ease-in-out "
              >
                Forgot Password?
              </a>
            </div>
            
            <button className=" flex items-center justify-center text-[18px] h-[48px] w-full text-white bg-gradient-to-br from-teal-400 to-teal-700 font-medium text-lg  py-2 px-4 rounded-xl hover:shadow-lg transition  duration-300 ease-in-out ">
             {authLoading ? (<div className="w-7 h-7 border-4 border-white border-t-teal-600 rounded-full animate-spin"></div>) : ("Sign In")}
            </button>
          </form>
        </div>
        <div className="px-6 w-full">
          <div className="flex items-center w-full py-4 justify-between">
            <div className="bg-teal h-[1px] w-[33.33333%] "></div>
            <div className=" text-text-muted text-sm max-sm:text-xs ">
              <p>Or continue with</p>
            </div>
            <div className="bg-teal h-[1px] w-[33.33333%] "></div>
          </div>
          <div className="">
            {/* <button className="flex items-center justify-center w-full border-gray-300 border-1 p-3 rounded-2xl hover:shadow">
              <img src="/google.webp" alt="" className="w-5 h-5 mr-3 " />
              <h3 className="text-text/85 text-sm font-medium  ">
                Continue with Google
              </h3>
            </button> */}
            <GoogleLogin
  onSuccess={credentialResponse => {
    const decoded = jwtDecode(credentialResponse.credential)
   onGoogleSubmit(decoded)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
          </div>
          <div className="flex items-center justify-center gap-1 p-4">
            <h3 className="text-text-muted text-base ">
              Don't have an account?
            </h3>
            <Link
              className="text-teal text-base hover:text-teal-700 transition duration-200 ease-in-out "
              to={"/signup"}
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
