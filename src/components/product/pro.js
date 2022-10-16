import React from "react";
import { Link } from "react-router-dom";

const Pro = ({ item }) => {
  return (
    <div className="w-full pro relative">
      <div className="pro-top">
        <img src={item.image1} alt="" type="image/webp" />
        <img src={item.image2} alt="" type="image/webp" />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex duration-300 pro-special ">
        <div className="flex gap-2 justify-center items-center">
          <Link
            to="/products/asd"
            className="p-2 border-2 border-[#000] bg-[#000] text-[#fff] hover:text-[#000] hover:bg-[#fff] duration-300 outline-none uppercase cursor-pointer flex items-center text-xs h-[41px]"
          >
            Shop now
          </Link>
          <div className="p-2 border-2 border-[#000] bg-[#000] text-[#fff] hover:text-[#000] hover:bg-[#fff] duration-200 outline-none uppercase cursor-pointer w-[41px] flex justify-center items-center h-[41px]">
            <ion-icon name="cart-outline"></ion-icon>
          </div>
        </div>
      </div>
      <div className="pro-bottom flex flex-col justify-center items-center">
        <div className="max-w-[80%] truncate">{item.name}</div>
        <div className="">{item.curr_price}</div>
      </div>
    </div>
  );
};

export default Pro;
