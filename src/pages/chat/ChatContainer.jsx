import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
const ChatContainer = ({ currentChat, socket, userInfo }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef(null);
  useEffect(() => {
    const body = {
      from: userInfo._id,
      to: currentChat._id,
    };
    const getMessage = async () => {
      const res = await axios.get("http://localhost:3001/message", body);
      res && setMessages(res?.data);
    };
    getMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat]);
  const handleSendMessage = async (msg) => {
    console.log(msg);
    // socket.current.emit("send-msg", {
    //   to: currentChat._id,
    //   from: userInfo._id,
    //   msg,
    // });
    // await axios.post("http://localhost:3001/message", {
    //   from: userInfo._id,
    //   to: currentChat._id,
    //   message: msg,
    // });

    // const msgs = [...messages];
    // msgs.push({ fromSelf: true, message: msg });
    // setMessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="flex flex-col w-3/4 p-2">
      <div className="w-full flex flex-col gap-2 overflow-auto flex-1">
        {messages.map((item) => (
          <div
            ref={scrollRef}
            className={`p-2 items-center flex w-full max-w-1/3 ${
              item.fromSelf ? "flex-end" : "flex-start"
            }`}
          >
            {item.message}
          </div>
        ))}
      </div>
      <ChatInput handleSendMessage={handleSendMessage}></ChatInput>
    </div>
  );
};

export default ChatContainer;
