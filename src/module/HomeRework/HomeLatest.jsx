import { Pro } from "components/product";
import { products } from "constant/testData";
import React from "react";
import { Link } from "react-router-dom";

const HomeLatest = () => {
  return (
    <div className="my-20 container">
      <div className="text-center text-[50px] font-bold uppercase text-black ">
        LATEST PRODUCT
      </div>
      <div className="overflow-hidden grid grid-cols-4 gap-2">
        {products.map((item) => (
          <Pro item={item}></Pro>
        ))}
      </div>
      <Link
        to="/products"
        className="mx-auto text-center block my-4 uppercase w-[120px] p-2 border-2 border-black bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] duration-200"
      >
        View all
      </Link>
    </div>
  );
};

export default HomeLatest;
