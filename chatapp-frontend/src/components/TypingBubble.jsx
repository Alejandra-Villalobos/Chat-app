import React from "react";

function TypingBubble() {
  return (
    <div className="bg-rose-400 px-2 rounded-md w-max m-3 font-jost font-semibold self-star flex justify-center">
      <p className="delay-700 animate-bounce text-white font-extrabold text-3xl">.</p>
      <p className="delay-1000 animate-bounce text-white font-extrabold text-3xl">.</p>
      <p className="animate-bounce text-white font-extrabold text-3xl">.</p>
    </div>
  );
}

export default TypingBubble;
