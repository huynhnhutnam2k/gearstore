import React, { useState } from "react";

const ChatInput = ({ handleSendMessage }) => {
  const [msg, setMsg] = useState("");
  return (
    <div className=" w-full flex">
      <input
        type="text"
        className="w-[85%] p-2 outline-none rounded"
        placeholder="Enter your message"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <div
        className="bg-slate-300 text-center w-[15%] p-2"
        onClick={() => handleSendMessage(msg)}
      >
        Send
      </div>
    </div>
  );
};

export default ChatInput;
