import React from "react";
import Loading from "./loading";

const loadingSkeleton = () => {
  return (
    <div className="w-full pro relative overflow-hidden">
      <Loading width="100%" height="300px" radius="8px"></Loading>
      <div className="pro-bottom flex flex-col justify-center items-center h-10 gap-y-1">
        <div className="max-w-[80%] truncate">
          <Loading width="100%" height="20px" radius="8px"></Loading>
        </div>
        <div className="">
          <Loading width="100%" height="20px" radius="8px"></Loading>
        </div>
      </div>
    </div>
  );
};

export default loadingSkeleton;
