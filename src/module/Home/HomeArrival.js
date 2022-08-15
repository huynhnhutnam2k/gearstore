import { Product } from "components/product";
import { PHONE_BREAKPOINT } from "constant/breakpoint";
import React from "react";
import { useSelector } from "react-redux";
import { Zoom } from "react-reveal";

const HomeArrival = () => {
  const { isMobile } = useSelector((state) => state.stateDevide);
  const { products } = useSelector((state) => state.product);
  return (
    <Zoom bottom>
      <div
        className={`w-full ${
          !isMobile ? "max-w-[1170px]" : `max-w-[${PHONE_BREAKPOINT}px]`
        } mx-auto my-5 p-2`}
      >
        <h2 className="uppercase text-center text-[25px] font-bold">
          new arival
        </h2>
        <div
          className={`grid ${
            !isMobile ? "grid-cols-4" : "grid-cols-2"
          } gap-5 my-4`}
        >
          {products.length > 0 ? (
            products?.map((product) => (
              <Product isSlide={false} product={product}></Product>
            ))
          ) : products.length === undefined ? (
            <Product products={products}></Product>
          ) : null}
        </div>
        <div className="flex h-[40px] items-center justify-center gap-2 cursor-pointer w-full">
          <div className="h-full flex justify-center items-center duration-150 bg-transparent w-10 hover:bg-gray-200 rounded-full">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </div>
          <div className="">1</div>
          <div className="h-full flex justify-center items-center duration-150 bg-transparent w-10 hover:bg-gray-200 rounded-full">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </div>
        </div>
      </div>
    </Zoom>
  );
};

export default HomeArrival;
