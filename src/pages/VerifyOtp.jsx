import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { unstable_OneTimePasswordField as OneTimePasswordField } from "radix-ui";
import axios from "../axiosInstance";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const [authLoading, setAuthLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300  );
//   const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState("".padEnd(6, " "));
  const [otpError, setOtpError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    
    let timer;
    if (timeLeft > 0) {
    //   setCanResend(false);
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else {
    //   setCanResend(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleOtpChange = (val) => {
    const clean = val.replace(/[^0-9]/g, "").padEnd(6, " ");
    setOtp(clean);
  };

  const handleInputChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    let otpArr = otp.split("");
    otpArr[idx] = val;
    setOtp(otpArr.join(""));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthLoading(true);

    const getOtp = otp.replace(/ /g, "");
    console.log(getOtp, "getOtp");
    if (getOtp.length !== 6) {
      setOtpError("Please enter all 6 digits.");
      setAuthLoading(false);
      return;
    }
    setOtpError("");
    const email = localStorage.getItem("email");
    const data = { otp: Number(getOtp), email: email };

    axios
      .post("/auth/verifyotp", data)
      .then((res) => {
        console.log(res.data, "OTP Verification Response");
        if (res.data) {
        toast.success("OTP verified successfully");
        setAuthLoading(false);
        navigate("/reset-password");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Invalid OTP. Please try again.");
        setAuthLoading(false);
      });
  };

  const handleResend = () => {
    setResendLoading(true)
    setTimeLeft(300);
    // setCanResend(false);
    const email = localStorage.getItem("email");
    axios
      .post("/auth/forgotpassword", { email: email })
      .then((res) => {
        if (res.status === 200) {
          toast.success("OTP resent successfully");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to resend OTP. Please try again.");
      }).finally(() => {
          setResendLoading(false);
      })
    
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 bg-[rgb(236,253,245)] min-h-dvh pb-10 justify-center max-sm:px-6 font-font">
      <div className="justify-start flex gap-2.5 text-[rgb(100,116,139)] pt-5 w-md max-sm:w-2xs hover:text-teal transition duration-150 ease-in-out">
        <div>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div>
          <Link className="" to={"/"}>
            Back to Home{" "}
          </Link>
        </div>
      </div>
      <div className="bg-white w-md h-full shadow-lg shadow-teal-500/10 rounded-lg flex flex-col items-center justify-between max-md:w-[448px] max-sm:w-full">
        <div className="flex flex-col items-center p-[24px] w-full">
          <div className="w-[64px] h-[64px] bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-2xl text-[32px] text-white">
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="text-center mt-[13px]">
            <h1 className="font-bold text-3xl text-text">Verify Your Email</h1>
            <p className="text-sm text-text-muted mt-2">
              Enter the 6-digit code sent to
            </p>
          </div>
        </div>
        <div className="w-full pl-[24px] pr-[24px]">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <div className="flex flex-col items-center justify-center">
              <OneTimePasswordField.Root
                value={otp}
                onChange={handleOtpChange}
                className="flex gap-2 max-sm:gap-1 flex-nowrap"
              >
                {[...Array(6)].map((_, idx) => (
                  <OneTimePasswordField.Input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={otp[idx] || ""}
                    onChange={(e) => handleInputChange(e, idx)}
                    className="w-12 h-12 max-sm:w-10 max-sm:h-10  text-center rounded-xl border-2 border-black/60 shadow-sm outline-none focus:border-teal text-black/90 text-xl hover:shadow-md"
                  />
                ))}
                <OneTimePasswordField.HiddenInput />
              </OneTimePasswordField.Root>
              {otpError && (
                <p className="text-red-600 py-3 text-sm text-center">
                  *{otpError}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <p className="text-text-muted text-sm">
                Code Expires in:{" "}
                <span className="text-teal font-semibold">
                  {formatTime(timeLeft)}
                </span>
              </p>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center text-[18px] h-[48px] w-full text-white bg-gradient-to-br from-teal-400 to-teal-700 font-medium text-lg py-2 px-4 rounded-xl hover:shadow-lg transition duration-300 ease-in-out"
            >
              {authLoading ? (
                <div className="w-7 h-7 border-4 border-white border-t-teal-600 rounded-full animate-spin"></div>
              ) : (
                "Verify Code"
              )}
            </button>
          </form>
          <div className="flex justify-center py-5">
            <p className="text-text-muted text-sm">Didn't receive the code?</p>
          </div>
          <div className="flex justify-center">
            <button
              className="inline-flex disabled:cursor-not-allowed items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:text-accent-bg h-10 px-4 py-2 border-teal-200 text-teal-500 hover:bg-bg bg-transparent rounded-xl"
            //   disabled={!canResend}
              onClick={handleResend}
            >
               {resendLoading ? (
                <div className="w-7 h-7 border-4 border-white border-t-teal-600 rounded-full animate-spin"></div>
              ) : (
                "Resend Code"
              )}
            </button>
          </div>
        </div>
        <div className="px-6 w-full">
          <div className="flex justify-between text-center gap-1 p-4">
            <h3 className="text-text-muted text-base ">Wrong email address?</h3>
            <Link
              className="text-teal text-base hover:text-teal-700 transition duration-200 ease-in-out "
              to={"/forgot-password"}
            >
              Change email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
