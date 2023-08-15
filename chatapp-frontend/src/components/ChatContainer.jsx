import React from "react";
import { Link } from "react-router-dom";

function ChatContainer({ username, id }) {
  return (
    <Link to={`/chat/${id}`}>
      <div className="h-28 w-40 bg-purple-500 p-3 rounded-md cursor-pointer flex items-center justify-center hover:scale-110 hover:bg-purple-600 hover:mx-2 duration-75">
        <p className="text-xl text-white">{username}</p>
      </div>
    </Link>
  );
}

export default ChatContainer;
