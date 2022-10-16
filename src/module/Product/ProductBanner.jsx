import React from "react";
import Banner from "asset/image/banner.png";
import { NavLink } from "react-router-dom";
const ProductBanner = () => {
  return (
    <div className="w-full h-[70vh] relative">
      <img src={Banner} alt="" className="w-full h-full object-cover" />
      <div className="bg-rgba z-10 w-full h-[70vh] absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="text-white flex h-[40px] items-center gap-x-2">
          <NavLink to="/">Home</NavLink>
          <span className="mt-1">
            <ion-icon name="caret-forward-outline"></ion-icon>
          </span>
          <NavLink to="/product">Product</NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
