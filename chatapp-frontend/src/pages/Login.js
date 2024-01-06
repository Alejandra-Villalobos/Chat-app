import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Outlet, useNavigate } from "react-router-dom";
import { Input } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import chatImage from "../assets/chat_image.png";
import { loginService, loginGoogle, registerGoogle } from "../services/auth";
import { findUserByEmail } from "../services/user";
import { useGoogleLogin } from "@react-oauth/google";

import { useAuth } from "../Context/AuthContext";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { setUser } = useAuth();

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    try {
      const userInfo = await loginService(email, password);
      setUser(userInfo)
      navigate("/home");
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
    }
  };

  const handleGoogleSuccess = async (googleToken) => {
    const userData = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${googleToken}`,
      },
    });
    const emailData = await userData.json();
    const { email: googleEmail, given_name } = emailData;
    const { data } = await findUserByEmail(googleEmail);
    if (data) {
      const userInfo = await loginGoogle(googleEmail);
      setUser(userInfo)
      navigate("/home");
    } else {
      await registerGoogle(googleEmail);
      localStorage.setItem("email", googleEmail);
      localStorage.setItem("username", given_name);
      navigate("/verify");
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      handleGoogleSuccess(tokenResponse.access_token),
  });

  return (
    <div className="flex font-patua">
      <ToastContainer />
      <div className="lg:w-1/2 w-full bg-emerald-200 h-screen flex flex-col justify-center items-center gap-4 pattern-crosses-sky-800/25">
        <p className="text-6xl">ChatApp</p>
        <button
          className="my-4 mx-2 flex gap-2 items-center text-xl text-gray-600 bg-white rounded-md px-6 py-3 w-3/5 md:w-1/2 hover:bg-gray-100 justify-evenly"
          onClick={() => login()}
        >
          <FcGoogle size={25} />
          Log in with Google Accounts
        </button>
        <div className="flex items-center justify-center w-1/2 gap-2">
          <hr className="border border-gray-500 mt-1 w-full rounded-lg" />
          <p className="text-gray-600">or</p>
          <hr className="border border-gray-500 mt-1 w-full rounded-lg" />
        </div>
        <form className="flex flex-col w-3/5 md:w-1/2">
          <Input
            className="mt-4 flex gap-5 text-xl text-gray-700 bg-white rounded-md px-6 py-3 w-full"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input.Password
            className="mt-4 flex text-xl text-gray-700 bg-white rounded-md px-6 py-3 w-full"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="mt-4 gap-5 text-2xl text-center text-white bg-fuchsia-300 rounded-md px-6 py-3 w-full hover:bg-fuchsia-400 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            Log in
          </button>
        </form>
      </div>
      <div className="w-1/2 bg-yellow-100 h-screen pattern-crosses-orange-800/25 hidden lg:block">
        <img alt="Chat" src={chatImage} className="w-full h-full" />
      </div>
      <Outlet />
    </div>
  );
}

export default Login;
