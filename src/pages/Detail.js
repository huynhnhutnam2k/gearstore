import { Button } from "components/button";
import Layout from "components/layout/layout";
import { Rating } from "components/rating";
import { Comment, Review } from "components/review";
import { TabContent } from "components/tab";
import { PHONE_BREAKPOINT } from "constant/breakpoint";
import { getOneProductAction } from "features/product/productSlice";
import { addToCart } from "module/Cart/cartSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

const Detail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isMobile } = useSelector((state) => state.stateDevide);
  const { product } = useSelector((state) => state.product);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  useEffect(() => {
    dispatch(getOneProductAction(id));
  }, [dispatch, id, pathname]);
  const { cart } = useSelector((state) => state.cart);
  console.log(cart);
  const handleAddCart = (product) => {
    // console.log(product);
    const { _id, name, price } = product;
    const productItem = {
      name,
      id: _id,
      price,
      quantity: +quantity,
      image: product.image[0],
      total: +quantity * +price,
    };
    dispatch(addToCart(productItem));
  };
  return (
    <Layout>
      {product._id ? (
        <div
          className={`w-full ${
            !isMobile ? "max-w-[1200px] " : `max-w-[${PHONE_BREAKPOINT}px]`
          } mx-auto mt-2`}
        >
          <div className="flex h-10 items-center gap-2">
            <NavLink to="/">Home</NavLink>
            <div className="w-5 h-5">
              <ion-icon name="caret-forward-outline"></ion-icon>
            </div>
            <div className="">{product?.name}</div>
          </div>
          <div className={`flex w-full ${isMobile ? "flex-col" : ""}`}>
            <div className={`${isMobile ? "w-full" : "w-1/2"} flex flex-col`}>
              <div className="w-full h-[50vh]">
                <img
                  src={`${product?.image[0]}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {product?.image?.map((image, index) => (
                  <div className="border rounded-md w-20 h-20" key={index}>
                    <img
                      src={`${image}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`${
                isMobile ? "w-full items-center" : "w-1/2"
              } px-5 py-5 text-[15px] flex flex-col gap-y-2`}
            >
              <div className="text-[30px]">{product?.name}</div>
              <table className="border-collapse w-[300px]">
                <tbody className="p-5">
                  <tr className="flex justify-between border">
                    <td className="px-2 py-2">Price</td>
                    <td className="px-2 py-2">{`${product?.price}$`}</td>
                  </tr>
                  <tr className="flex justify-between border">
                    <td className="px-2 py-2">Status</td>
                    {product?.countInStock >= 1 ? (
                      <td className="px-2 py-2">In stock</td>
                    ) : (
                      <td className="px-2 py-2">Out of stock</td>
                    )}
                  </tr>
                  <tr className="flex justify-between border">
                    <td className="px-2 py-2">Rating</td>
                    <td className="px-2 py-2">
                      <Rating value={`${product?.rating}`}></Rating>
                    </td>
                  </tr>
                  <tr className="flex justify-between border">
                    <td className="px-2 py-2">Quantity</td>
                    <td className="px-2 py-2">
                      <select
                        name="quantity"
                        id=""
                        value={quantity}
                        className="w-[50px] outline-none bg-gray-300 rounded-md"
                        onChange={(e) => setQuantity(e.target.value)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Button
                kind="secondary"
                onClick={() => handleAddCart(product)}
                className="w-[300px] border-black border px-5 mt-2 rounded py-2 bg-gradient-to-br from-[#1DC071] to-[#A4D96C] text-white"
              >
                Add to cart
              </Button>
            </div>
          </div>
          <div className="w-full h-[40vh] mt-2 mb-2 border-b border-b-[#ccc]">
            <TabContent description={product?.description}></TabContent>
          </div>
          <div className="">
            <Comment></Comment>
            <Review></Review>
          </div>
        </div>
      ) : null}
    </Layout>
  );
};

export default Detail;
