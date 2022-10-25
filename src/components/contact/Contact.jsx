import React from "react";

const Contact = ({ contacts, handleCurrentChat }) => {
  return (
    <div className="w-1/4 flex flex-col gap-y-2 p-2">
      {contacts?.map((item) => (
        <div
          className="h-20 flex justify-between items-center bg-slate-300 rounded-lg cursor-pointer"
          onClick={() => handleCurrentChat(item._id)}
        >
          <div className="w-20 h-20">
            <img
              src={item.avatar}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-black flex-1 uppercase">{item.username}</div>
        </div>
      ))}
    </div>
  );
};

export default Contact;
