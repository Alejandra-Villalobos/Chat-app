import { Routes, Route } from "react-router-dom";
import socketIO, { io } from "socket.io-client";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Verify from "./pages/Verify";
import SetPass from "./pages/SetPass";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./Context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/setPass" element={<SetPass />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
