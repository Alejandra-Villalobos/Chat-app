import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Input } from "antd";
import { verifyCode, deactivateCode } from "../services/verification";
import Footer from "../components/Footer";

function Verify() {
  const email = localStorage.getItem("email")

  const [code, setCode] = useState('');
  var [submitCounter, setSubmitCounter] = useState(0);

  const navigate = useNavigate();
  const handleVerification = async (e) => {
    setSubmitCounter(counter => counter + 1)
    if(submitCounter >= 4){
      toast.error("Max submit attempts reached, ask for a new code")
      deactivateCode(email)
      return
    }
    try {
      await verifyCode(email, code);
      setTimeout(() => {
        navigate("/setPass");
      }, 3000);
    } catch (error) {
    }
      setCode('')
      console.log(submitCounter)
  };

  return (
    <div className="flex font-patua">
      <ToastContainer/>
      <div className="w-full bg-emerald-200 h-screen flex flex-col justify-center items-center gap-4 pattern-crosses-sky-800/25">
        <p className="text-6xl">ChatApp</p>
        <form className="m-8 p-8 flex flex-col gap-5 items-center h-max w-4/5 md:w-max bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-60 border border-gray-100">
          <p className="text-3xl">Verification code</p>
          <p className="font-jost text-center">
            Enter the verification code we sent to {email}
          </p>
          <Input
            className="mt-4 flex text-xl text-gray-700 bg-white rounded-md px-6 py-3 w-full"
            placeholder="Verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="mt-4 gap-5 text-2xl text-center text-white bg-fuchsia-300 rounded-md px-6 py-3 w-full hover:bg-fuchsia-400 cursor-pointer"
            onClick={(e) => {
                e.preventDefault();
                handleVerification();
              }}
          >Submit</button>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default Verify;
