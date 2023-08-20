import React from "react";

function LeftMessage({ message, timestamp, color, position }) {
  return (
      <div className={`${color} p-3 rounded-md w-max h-max m-3 ${position}`}>
        <p className="text-xl text-white">{message}</p>
        <p className="text-xl text-gray-400">{timestamp}</p>
      </div>
  );
}

export default LeftMessage;