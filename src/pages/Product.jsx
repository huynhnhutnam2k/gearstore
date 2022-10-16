import NewLayout from "components/layout/NewLayout";
import ProductNavigation from "module/Product/ProductNavigation";
import ProductRender from "module/Product/ProductRender";
import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Product = () => {
  useEffect(() => {
    window.scrollTo(0, 0, "smooth");
  }, []);
  return (
    <NewLayout>
      <div className="container">
        <div className="flex p-5 gap-x-3 gap-y-3">
          <Link to="/" className="hover:text-red-800 uppercase duration-150">
            Home
          </Link>
          <div className="">
            <ion-icon name="play-forward-outline"></ion-icon>
          </div>
          <Link
            to="/products"
            className=" hover:text-red-800 uppercase duration-150"
          >
            All Products
          </Link>
        </div>
        <div className="p-5 flex gap-x-2">
          <ProductNavigation></ProductNavigation>
          <ProductRender></ProductRender>
        </div>
      </div>
    </NewLayout>
  );
};

export default Product;
