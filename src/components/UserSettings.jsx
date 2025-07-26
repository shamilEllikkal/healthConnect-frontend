import Snackbar from "@mui/material/Snackbar";
// const UserSettings = () => {

//   return (
//    <div className='pl-70 bg-bg w-full min-h-dvh'><h1>
//    Coming soon....

//     </h1>
//     </div>
//   );
// };

// export default UserSettings;

//label on save Changes
//disabled on booking
//same email diff pass issue
//input select fetch data and search
//google integration

import React, { useState, useRef } from "react";

export default function UserSettings() {
  const length = 6; // Change to 4 if needed
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("").slice(0, length);
    setOtp([...newOtp, ...Array(length - newOtp.length).fill("")]);

    const lastIndex = Math.min(paste.length, length) - 1;
    inputsRef.current[lastIndex]?.focus();
  };

  const handleSubmit = () => {
    alert(`Entered OTP: ${otp.join("")}`);
    // You can send to backend here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50 p-4">
      <h2 className="text-2xl font-bold text-gray-700">Enter OTP</h2>

      <div className="flex gap-2" onPaste={handlePaste}>
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => (inputsRef.current[idx] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      <Snackbar
        open={true}
        autoHideDuration={6000}
        // onClose={handleClose}
        message="Note archived"
        // action={action}
      />

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        onClick={handleSubmit}
        disabled={otp.join("").length !== length}
      >
        Verify
      </button>
    </div>
  );
}
