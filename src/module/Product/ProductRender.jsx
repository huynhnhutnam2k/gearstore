import React from "react";
import { Pro } from "components/product";
const ProductRender = ({ products, isMobile }) => {
  return (
    <div
      className={`${
        isMobile ? "w-full grid-cols-2" : "w-3/4 grid-cols-3"
      } grid gap-2`}
    >
      {products.map((item) => (
        <Pro item={item}></Pro>
      ))}
    </div>
  );
};

export default ProductRender;
