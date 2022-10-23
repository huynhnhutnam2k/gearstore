import NewLayout from "components/layout/NewLayout";
import LoadingSkeleton from "components/loading/loadingSkeleton";
import { Pro } from "components/product";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { v4 } from "uuid";
const ProductSearch = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const { pathname } = useLocation();
  const { isMobile } = useSelector((state) => state.stateDevide);
  useEffect(() => {
    console.log(isLoading, products);
  }, [products, isLoading]);
  return (
    <NewLayout>
      <div className={`container ${isMobile ? "" : "p-5"}`}>
        <div className={`flex ${isMobile ? "" : "p-5"} gap-x-3 gap-y-3`}>
          <Link
            to="/search"
            className="hover:text-red-800 uppercase duration-150"
          >
            Search
          </Link>
          <div className="">
            <ion-icon name="play-forward-outline"></ion-icon>
          </div>
          <Link
            to="/products"
            className=" hover:text-red-800 uppercase duration-150"
          >
            {pathname.split("/")[2]}
          </Link>
        </div>
        {isLoading && (
          <div
            className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-4"} gap-2`}
          >
            {new Array(10).fill(0).map(() => (
              <LoadingSkeleton key={v4()}></LoadingSkeleton>
            ))}
          </div>
        )}
        <div
          className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-4"} gap-2`}
        >
          {!isLoading &&
            products.length > 0 &&
            products.map((item) => <Pro item={item}></Pro>)}
        </div>
      </div>
    </NewLayout>
  );
};

export default ProductSearch;
