import { Pro } from "components/product";
import { products } from "constant/testData";
import React from "react";
const HomeBestSelling = () => {
  return (
    <div className="my-20 container">
      <div className="text-center text-[50px] font-bold uppercase text-black ">
        Best selling
      </div>
      <div className="overflow-hidden grid grid-cols-4 gap-2">
        {products.map((item) => (
          <Pro item={item}></Pro>
        ))}
      </div>
    </div>
  );
};

export default HomeBestSelling;
