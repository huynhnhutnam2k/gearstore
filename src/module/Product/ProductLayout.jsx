import { Search, Filter } from "components/search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OneSquare from "asset/image/one-square.png";
import FourSquare from "asset/image/four-square.png";
import { Product, ProductFullsize } from "components/product";
import { getAllProductsAction } from "features/product/productSlice";
const ProductLayout = () => {
  const { keyword } = useSelector((state) => state.search);
  const { isMobile } = useSelector((state) => state.stateDevide);
  const [layout, setLayout] = useState("four");
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  console.log(keyword);
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);
  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex gap-2">
        <Search placeholder="Search your product"></Search>
        <Filter></Filter>
        {!isMobile && (
          <div className="flex w-full max-w-[10%] gap-x-2">
            <div
              className="w-10 h-10 cursor-pointer"
              onClick={() => setLayout("one")}
            >
              <img
                src={OneSquare}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="w-10 h-10 cursor-pointer"
              onClick={() => setLayout("four")}
            >
              <img
                src={FourSquare}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
      {layout === "one" ? (
        <div className="flex flex-col w-full px-2 pt-2 gap-y-2">
          {products.map((product, index) => (
            <ProductFullsize product={product}></ProductFullsize>
          ))}
        </div>
      ) : (
        <div
          className={`grid ${
            !isMobile ? "grid-cols-4" : "grid-cols-2"
          } px-2 mt-2 gap-x-8 gap-y-4`}
        >
          {products.map((product, index) => (
            <Product
              isSlide={false}
              product={product}
              key={product?._id}
            ></Product>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductLayout;
