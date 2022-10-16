import NewLayout from "components/layout/NewLayout";
import React from "react";
import { Link } from "react-router-dom";

const Chat = () => {
  return (
    <NewLayout>
      <div className="container p-5">
        <div className="flex  gap-x-3 gap-y-3">
          <Link to="/" className="hover:text-red-800 uppercase duration-150">
            Home
          </Link>
          <div className="">
            <ion-icon name="play-forward-outline"></ion-icon>
          </div>
          <Link
            to="/chat"
            className=" hover:text-red-800 uppercase duration-150"
          >
            Chat
          </Link>
        </div>
        <div className="mt-4 h-[500px] w-full border-2 border-black"></div>
      </div>
    </NewLayout>
  );
};

export default Chat;
