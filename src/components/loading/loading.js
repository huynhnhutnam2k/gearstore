import React from "react";

const Loading = ({ width = "40px", height = "40px" }) => {
  return (
    <div
      className={`w-[${width} h-[${height}] animate-spin border-[5px] border-top-transparent border-blue-400 rounded-[50%]`}
    ></div>
  );
};

export default Loading;
