import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "antd";
import { verifyAccountStatus } from "../services/verification";
import { registerService } from "../services/auth";

function SetPass() {
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");

  const [pass, setPass] = useState();
  const [checkPass, setCheckPass] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    verifyAccount();
  }, []);

  const verifyAccount = async (e) => {
    try {
      await verifyAccountStatus(email);
    } catch (error) {
      toast.error(error);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  };

  const handleRegister = async (e) => {
    verifyAccount();
    if (pass !== checkPass) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      await registerService(email, username, pass);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex font-patua">
      <ToastContainer />
      <div className="w-full bg-emerald-200 h-screen flex flex-col justify-center items-center gap-4 pattern-crosses-sky-800/25">
        <p className="text-6xl">ChatApp</p>
        <form className="m-8 p-8 flex flex-col gap-5 items-center h-maxl w-max bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-60 border border-gray-100">
          <p className="text-3xl">Set password</p>
          <p className="font-jost">Set a password to activate your account</p>
          <Input.Password
            className="mt-4 flex text-lg text-gray-700 bg-white rounded-md px-6 py-3 w-full"
            placeholder="Enter password"
            onChange={(e) => setPass(e.target.value)}
          />
          <Input.Password
            className="mt-4 flex text-lg text-gray-700 bg-white rounded-md px-6 py-3 w-full"
            placeholder="Repeat password"
            onChange={(e) => setCheckPass(e.target.value)}
          />
          <button className="mt-4 gap-5 text-2xl text-center text-white bg-fuchsia-300 rounded-md px-6 py-3 w-full hover:bg-fuchsia-400 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetPass;