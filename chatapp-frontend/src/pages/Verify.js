import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyCode, deactivateCode } from "../services/verification";

function Verify({ email }) {
  const [code, setCode] = useState();
  var [submitCounter, setSubmitCounter] = useState(0);

  const navigate = useNavigate();
  const handleVerification = async (e) => {
    try {
      await verifyCode(email, code);
      
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
    }
  };

  return (
    <div className="flex font-patua">
      <div className="w-1/2 bg-emerald-200 h-screen flex flex-col justify-center items-center gap-4">
        <p className="text-6xl">ChatApp</p>
        <form>
          <p className="text-3xl">Verification code</p>
          <p className="text-3xl">
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
