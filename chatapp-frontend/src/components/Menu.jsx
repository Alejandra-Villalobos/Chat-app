import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineLogout } from "react-icons/md";
import { logout } from '../services/auth';

function Menu({ username }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    const handleLogout = async (e) => {
        try {
          await logout(token)
          navigate("/");
        } catch (error) {
          console.error("Error:", error);
        }
      };

  return (
    <nav className="w-full bg-yellow-100 flex justify-between p-3">
        <p className="text-xl" onClick={() => navigate("/home")}>ChatApp</p>
        <p className="text-xl">Welcome, {username}!</p>
        <button onClick={(e) => {
            e.preventDefault(); 
            handleLogout()
        }}><MdOutlineLogout /></button>
      </nav>
  )
}

export default Menu