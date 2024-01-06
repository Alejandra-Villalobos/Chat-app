import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { createChat } from "../services/chat";

import { useAuth } from "../Context/AuthContext";

function AddChatButton({ chatExists, email, onChatAdded }) {
  const { user } = useAuth();
  const token = user.token;

  const handleCreateChat = async () => {
    await createChat(token, email);
    onChatAdded();
  };

  return (
    <div className="w-40">
      {chatExists ? (
        <div className="rounded-md bg-blue-500 w-full p-2 flex items-center justify-around cursor-default">
          <p className="text-center text-white font-jost text-lg text-md">
            Chat Added
          </p>
          <FaUserFriends size={25} color="white" />
        </div>
      ) : (
        <div
          className="rounded-md bg-green-500 w-full p-2 flex items-center justify-around"
          onClick={() => handleCreateChat()}
        >
          <button className="text-center text-white font-jost text-lg text-md">
            Add chat
          </button>
          <IoPersonAddSharp size={25} color="white" />
        </div>
      )}
    </div>
  );
}

export default AddChatButton;
