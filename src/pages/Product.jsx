import NewLayout from "components/layout/NewLayout";
import ProductNavigation from "module/Product/ProductNavigation";
import ProductRender from "module/Product/ProductRender";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Product = () => {
  useEffect(() => {
    window.scrollTo(0, 0, "smooth");
  }, []);
  const { products } = useSelector((state) => state.product);
  const [listProduct, setListProduct] = useState(products);
  const [showNav, setShowNav] = useState(false);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(1000);
  const [category, setCategory] = useState("");
  const [star, setStar] = useState([]);
  const [filter, setFilter] = useState([]);
  const { isMobile } = useSelector((state) => state.stateDevide);
  useEffect(() => {
    let test = products.filter(
      (item) => item.price >= +minVal && item.price <= +maxVal
    );
    if (category !== "" && star.length > 0) {
      test = test.filter(
        (item) => item.category.name === category && star.includes(+item.rating)
      );
      setListProduct([...test]);
    } else if (category === "" && star.length > 0) {
      test = test.filter((item) => star.includes(item.rating));
      setListProduct(test);
    } else if (category !== "") {
      test = test.filter((item) => item.category.name === category);
      setListProduct([...test]);
    } else {
      setListProduct([...test]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minVal, maxVal, category, star, filter]);
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
        <div className={` flex gap-x-2 ${isMobile ? "flex-col" : "p-5"}`}>
          {isMobile && !showNav ? (
            <div
              className="w-[120px] bg-[#000] text-[#fff] border-2 border-black mb-4 flex justify-center items-center p-2 uppercase cursor-pointer"
              onClick={() => setShowNav(true)}
            >
              Filter
            </div>
          ) : (
            <ProductNavigation
              minVal={minVal}
              setMinVal={setMinVal}
              maxVal={maxVal}
              setMaxVal={setMaxVal}
              category={category}
              setCategory={setCategory}
              star={star}
              setStar={setStar}
              filter={filter}
              showNav={showNav}
              setShowNav={setShowNav}
              setFilter={setFilter}
              isMobile={isMobile}
            ></ProductNavigation>
          )}

          <ProductRender
            products={listProduct}
            isMobile={isMobile}
          ></ProductRender>
        </div>
      </div>
    </NewLayout>
  );
};

export default Product;
