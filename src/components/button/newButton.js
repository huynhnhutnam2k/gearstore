import React from "react";

const newButton = ({ text = "Shop now", className, onClick }) => {
  return (
    <div
      className={` cursor-pointer w-[120px] text-sm p-2 border-2 flex justify-center uppercase border-black bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] duration-200 ${className}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default newButton;
