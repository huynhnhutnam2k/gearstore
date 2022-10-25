import React, { useEffect, useRef } from "react";
import Contact from "../../components/contact/Contact";
import Welcome from "../../components/welcome/Welcome";
import { useAuthStore } from "../../store/auth-store";
import { useChatStore } from "../../store/chat-store";
import ChatContainer from "./ChatContainer";
import { io } from "socket.io-client";
const Chat = () => {
  const { currentChat, setCurrentChat, contacts, getAllContact } =
    useChatStore();
  const { userInfo } = useAuthStore();
  const socket = useRef();
  useEffect(() => {
    if (userInfo?._id) {
      socket.current = io("http://localhost:3002");
      socket.current.emit("add-user", userInfo._id);
    }
  }, [userInfo]);
  useEffect(() => {
    getAllContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCurrentChat = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <div className="flex gap-x-2 shadow-md min-h-[70vh] w-full bg-slate-600">
      <Contact
        contacts={contacts}
        handleCurrentChat={handleCurrentChat}
      ></Contact>
      {currentChat === null ? (
        <Welcome></Welcome>
      ) : (
        <ChatContainer
          userInfo={userInfo}
          currentChat={currentChat}
          socket={socket}
        ></ChatContainer>
      )}
    </div>
  );
};
export default Chat;
