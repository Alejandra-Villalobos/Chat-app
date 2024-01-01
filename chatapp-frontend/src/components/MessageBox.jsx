import React from "react";

function LeftMessage({ message, timestamp, visibility, ownMessage, color, position }) {
  return (
      <div className={`${color} p-3 rounded-md w-max h-max m-3 ${position}`}>
        <p className="text-xl text-white">{message}</p>
        <p className="text-sm italic text-gray-300 text-right">{timestamp}</p>
      </div>
  );
}

export default LeftMessage;