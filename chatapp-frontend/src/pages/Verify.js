import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { verifyCode, deactivateCode } from "../services/verification";

function Verify() {
  const email = localStorage.getItem("email")

  const [code, setCode] = useState();
  var [submitCounter, setSubmitCounter] = useState(0);

  const navigate = useNavigate();
  const handleVerification = async (e) => {
    try {
      await verifyCode(email, code);
      console.log("Code accepted!")
      navigate("/setPass");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex font-patua">
      <ToastContainer/>
      <div className="w-full bg-emerald-200 h-screen flex flex-col justify-center items-center gap-4">
        <p className="text-6xl">ChatApp</p>
        <form className="m-8 p-8 flex flex-col gap-5 items-center h-maxl w-max bg-pink-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-60 border border-gray-100">
          <p className="text-3xl">Verification code</p>
          <p className="text-md italic">
            Enter the verification code we sent to {email}
          </p>
          <input
            placeholder="Verification code"
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            onClick={(e) => {
                e.preventDefault();
                handleVerification();
                setSubmitCounter(submitCounter++)
              }}
          >Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Verify;
