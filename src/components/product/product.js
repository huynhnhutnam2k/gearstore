import React from "react";
import { NavLink } from "react-router-dom";
const Product = ({ isSlide = true, product, ...props }) => {
  return (
    <div
      className={`product ${
        isSlide === true ? "max-w-[195px] h-[250px]" : "max-w-[300px] h-[300px]"
      }`}
    >
      <div className={`product-image`}>
        <img src={`${product?.image[0]}`} alt="" />
        <img src={`${product?.image[0]}`} alt="" />
      </div>
      <div className="flex flex-col items-center z-20 mt-auto">
        <div className="cursor-pointer">{product?.name}</div>
        <p>{product?.price}</p>
      </div>
      <div className="product-effect ">
        <div className="product-effect-item delay-150">
          <ion-icon name="star-outline"></ion-icon>
        </div>
        <div className="product-effect-item delay-300">
          <ion-icon name="bag-add-outline"></ion-icon>
        </div>
      </div>
      <div className="product-surface"></div>
      <NavLink to={`/products/${product?._id}`} className="product-link">
        Xem chi tiết{" "}
      </NavLink>
    </div>
  );
};

export default Product;
