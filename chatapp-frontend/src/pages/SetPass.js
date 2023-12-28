import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
      <div className="w-1/2 bg-emerald-200 h-screen flex flex-col justify-center items-center gap-4">
        <p className="text-6xl">ChatApp</p>
        <form>
          <p className="text-3xl">Set password</p>
          <p className="text-3xl">Set a password to activate your account</p>
          <input
            placeholder="Enter password"
            onChange={(e) => setPass(e.target.value)}
          />
          <input
            placeholder="Repeat password"
            onChange={(e) => setCheckPass(e.target.value)}
          />
          <button
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
