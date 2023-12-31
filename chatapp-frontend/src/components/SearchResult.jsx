import React from "react";
import { FaUserAlt } from "react-icons/fa";
import AddChatButton from "./AddChatButton";

function SearchResult({ email, name, chatExists, onChatAdded  }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3 w-5/6">
        <div>
          <FaUserAlt size={25} />
        </div>
        <div>
          <p className="bold">{email}</p>
          <p className="italic font-jost">{name}</p>
        </div>
      </div>
      <AddChatButton chatExists={chatExists} email={email} onChatAdded={onChatAdded}/>
    </div>
  );
}

export default SearchResult;
