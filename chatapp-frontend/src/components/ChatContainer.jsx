import React from "react";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

function ChatContainer({ useremail, username, id }) {
  return (
    <Link to={`/chat/${id}`}>
      <div className="h-max w-max bg-purple-500 px-2 border-4 shadow-xl shadow-back border-white rounded-md cursor-pointer flex items-center justify-center hover:scale-110 hover:bg-purple-600 hover:mx-1 duration-75">
        <RxAvatar size={35}/>
        <div className="border-l-2 border-white pl-2 ml-2">
          <p className="text-xl text-center text-white">{username}</p>
          <p className="text-xl text-center text-white font-jost">{useremail}</p>
        </div>
      </div>
    </Link>
  );
}

export default ChatContainer;
