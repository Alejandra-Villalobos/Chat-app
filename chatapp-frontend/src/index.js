import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import socketIO, { io } from 'socket.io-client';

import Login from "./pages/Login";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Verify from "./pages/Verify";
import SetPass from "./pages/SetPass";

const socket = socketIO.connect('http://localhost:8080');

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="304673433155-2or61f8m1aojk5h5dka07nsj9ev04c1p.apps.googleusercontent.com">
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/setPass" element={<SetPass />} />
        <Route path="/home" element={<Home  socket={socket}/>} />
        <Route path="/chat/:id" element={<Chat socket={socket}/>} />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
