import React from "react";

import { Pro } from "components/product";
import { products } from "constant/testData";

const ProductRender = () => {
  return (
    <div className="w-3/4 grid grid-cols-3 gap-2">
      {products.map((item) => (
        <Pro item={item}></Pro>
      ))}
    </div>
  );
};

export default ProductRender;
