import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { Popover } from "antd";
import { editvisibility } from "../services/message";

import { useAuth } from "../Context/AuthContext";

function MessageBox({
  id,
  message,
  timestamp,
  visibility,
  ownMessage,
  color,
  position,
  socket,
  onVisibilityEdited,
  chatId
}) {
  const { user } = useAuth();
  const token = user.token;

  const handleEditVisibility = async (visibility) => {
    await editvisibility(token, id, visibility);
    socket.emit("editMessage", chatId);
  };

  useEffect(() => {
    socket.on("editMessageResponse", data => onVisibilityEdited());
  }, [socket]);

  const [messageVisibility, setMessageVisibility] = useState(
    <p className="text-white">{message}</p>
  );
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const content = (
    <div className="flex items-start">
      <div className="flex flex-col mr-2">
        <button
          className="text-red-500 rounded-md p-1 hover:bg-red-600 hover:text-white transition"
          onClick={() => handleEditVisibility("not me")}
        >
          Delete for me
        </button>
        <button
          className="text-red-500 rounded-md p-1 hover:bg-red-600 hover:text-white transition"
          onClick={() => handleEditVisibility("none")}
        >
          Delete for everyone
        </button>
      </div>
      <RxCross2 size={12} onClick={hide} />
    </div>
  );

  useEffect(() => {
    if (visibility === "none")
      setMessageVisibility(
        <p className="text-stone-400 font-bold italic">Message deleted</p>
      );
    if (visibility === "not me" && ownMessage)
      setMessageVisibility(
        <p className="text-stone-400 font-bold italic">Message deleted</p>
      );
  }, [onVisibilityEdited]);
  return (
    <>
      <div
        key={id}
        className={`${color} p-3 rounded-md w-max max-w-2xl h-max m-3 font-jost font-semibold ${position}`}
      >
        <div className="flex justify-between items-start">
          {messageVisibility}
          {ownMessage && visibility === "all" ? (
            <Popover
              content={content}
              placement="topLeft"
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <button>
                <AiFillDelete color="#949699" size={20} />
              </button>
            </Popover>
          ) : (
            <></>
          )}
        </div>
        <p className="text-sm italic text-gray-300 text-right">{timestamp}</p>
      </div>
    </>
  );
}

export default MessageBox;
