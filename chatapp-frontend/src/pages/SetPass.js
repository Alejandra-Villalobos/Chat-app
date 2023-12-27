import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyCode, deactivateCode } from "../services/verification";

function SetPass({ email }) {
  const [pass, setPass] = useState();
  const [chackPass, setCheckPass] = useState();

  const navigate = useNavigate();
 

  return (
    <div className="flex font-patua">
      <div className="w-1/2 bg-emerald-200 h-screen flex flex-col justify-center items-center gap-4">
        <p className="text-6xl">ChatApp</p>
        <form>
          <p className="text-3xl">Set password</p>
          <p className="text-3xl">
            Set a password to activate your account
          </p>
          <input
            placeholder="Enter password"
            onChange={(e) => setPass(e.target.value)}
          />
          <input
            placeholder="Repeat password"
            onChange={(e) => setCheckPass(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SetPass;