import React from "react";
import { Pro } from "components/product";
const ProductRender = ({ products, isMobile, limit, setLimit, isLoading }) => {
  return (
    <div
      className={`flex flex-col min-h-[400px] ${isMobile ? "w-full" : "w-3/4"}`}
    >
      <div
        className={`${
          isMobile ? "w-full grid-cols-2" : "w-full grid-cols-3"
        } grid gap-2`}
      >
        {products.map((item) => (
          <Pro item={item}></Pro>
        ))}
      </div>
      <div
        className="w-[120px] p-2 bg-[#000] text-[#fff] flex justify-center cursor-pointer mt-auto mx-auto "
        onClick={() => setLimit(limit + 10)}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-4 border-[#fff] rounded-full animate-spin border-t-transparent"></div>
        ) : (
          <div className="">Xem thêm</div>
        )}
      </div>
    </div>
  );
};

export default ProductRender;
