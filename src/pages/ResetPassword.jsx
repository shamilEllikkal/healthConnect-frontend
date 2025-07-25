import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
} from "@fortawesome/free-regular-svg-icons";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "*Password must be at least 6 characters")
    .required("*Password is required"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const ResetPassword = () => {
  const [authLoading, setAuthLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = async (data) =>{
    setAuthLoading(true);
    const {password} = data;
    const email = localStorage.getItem("email");
    const resetData = {password: password, email: email};
    await axios.patch("auth/resetpassword", resetData).then((res) => {
      if (res.status === 200) {
        toast.success("Password reset successfully");
        setAuthLoading(false);
        localStorage.removeItem("email");
        reset();
        navigate("/login");
      }
    }).catch((err) => {
      console.error(err);   
        toast.error("Failed to reset password. Please try again.");
        setAuthLoading(false);
        reset()
    });

  }

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
            <h1 className="font-bold text-3xl text-text">Reset Your Password</h1>
            <p className="text-sm text-text-muted mt-2">
            Create a new secure password for your account
            </p>
          </div>
        </div>
        <div className="w-full pl-[24px] pr-[24px] ">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate action="">
            <div className="flex flex-col ">
              <label className="text-text/90  font-medium text-sm ">
          New Password
              </label>
              <input
                type="email"
                className="mt-[16px] text-sm p-3.5 placeholder-gray-200 border-gray-300 rounded-xl border focus:ring-2 focus:outline-none focus:ring-teal text-text "
                {...register("password")}
                placeholder="Enter Your New Password"
              />
              <p className=" text-red-600 text-sm p-0.5 ">
                {errors.password?.message}
              </p>
            </div>
              <div className="flex flex-col ">
              <label className="text-text/90  font-medium text-sm ">
               Confirm New Password
              </label>
              <input
                type="email"
                className="mt-[16px] text-sm p-3.5 placeholder-gray-200 border-gray-300 rounded-xl border focus:ring-2 focus:outline-none focus:ring-teal text-text "
                {...register("confirmPassword")}
                placeholder="Confirm Your New Password"
              />
              <p className=" text-red-600 text-sm p-0.5 ">
                {errors.confirmPassword?.message}
              </p>
            </div>

            <button type="submit" className=" flex items-center justify-center text-[18px] h-[48px] w-full text-white bg-gradient-to-br from-teal-400 to-teal-700 font-medium text-lg  py-2 px-4 rounded-xl hover:shadow-lg transition  duration-300 ease-in-out ">
              {authLoading ? (
                <div className="w-7 h-7 border-4 border-white border-t-teal-600 rounded-full animate-spin"></div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
        <div className="px-6 w-full">
        
          <div className="flex items-center justify-center gap-1 p-4">
            <h3 className="text-text-muted text-base ">
          Remember your password?
            </h3>
            <Link
              className="text-teal text-base hover:text-teal-700 transition duration-200 ease-in-out "
              to={"/login"}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
