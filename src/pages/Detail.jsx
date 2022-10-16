/* eslint-disable jsx-a11y/alt-text */
import { JBLTune220TWS1, JBLTune220TWS2 } from "asset/image/image";
import { NewButton } from "components/button";
import NewLayout from "components/layout/NewLayout";
import { Pro } from "components/product";
import { Rating } from "components/rating";
import { Comment, Review } from "components/review";
import { TabContent } from "components/tab";
import { PHONE_BREAKPOINT } from "constant/breakpoint";
import { products } from "constant/testData";
import { getOneProductAction } from "features/product/productSlice";
import { addToCart } from "app/cartSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import { addOrderItem } from "app/orderSlice";
const Detail = () => {
  useEffect(() => {
    window.scrollTo(0, 0, "smooth");
  }, []);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(JBLTune220TWS1);
  const img1 = JBLTune220TWS1;
  const img2 = JBLTune220TWS2;
  // const { isMobile } = useSelector((state) => state.stateDevide);
  // const { product } = useSelector((state) => state.product);
  // const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  // const { pathname } = useLocation();
  // const id = pathname.split("/")[2];
  // useEffect(() => {
  //   dispatch(getOneProductAction(id));
  // }, [dispatch, id, pathname]);
  // const { cart } = useSelector((state) => state.cart);
  // console.log(cart);
  // const handleAddCart = (product) => {
  //   // console.log(product);
  //   const { _id, name, price } = product;
  //   const productItem = {
  //     name,
  //     id: _id,
  //     price,
  //     quantity: +quantity,
  //     image: product.image[0],
  //     total: +quantity * +price,
  //   };
  //   dispatch(addToCart(productItem));
  // };
  const { orderItem } = useSelector((state) => state.order);

  console.log(orderItem);
  const imageProps = {
    smallImage: {
      alt: "Phasellus laoreet",
      isFluidWidth: true,
      src: img1,
    },
    largeImage: {
      src: img1,
      width: 600,
      height: 600,
    },
    enlargedImageContainerStyle: { background: "#fff", zIndex: 9 },
  };
  const imageProps2 = {
    smallImage: {
      alt: "Phasellus laoreet",
      isFluidWidth: true,
      src: img2,
    },
    largeImage: {
      src: img2,
      width: 600,
      height: 600,
    },
    enlargedImageContainerStyle: { background: "#fff", zIndex: 9 },
  };
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
          <div className="">
            <ion-icon name="play-forward-outline"></ion-icon>
          </div>
          <Link
            to="/products"
            className=" hover:text-red-800 uppercase duration-150"
          >
            Product
          </Link>
        </div>
        <div className="flex gap-x-2">
          <div className="w-5/12 p-5">
            <div className="flex justify-center items-center zoom">
              {mainImage === img1 ? (
                <>
                  <ReactImageMagnify {...imageProps} />
                </>
              ) : (
                <>
                  <ReactImageMagnify {...imageProps2} />
                </>
              )}
            </div>
            <div className="flex justify-center items-center ">
              <div
                className="w-[90px] cursor-pointer mx-[10px] border border-[#ccc]"
                onClick={() => {
                  setMainImage(JBLTune220TWS2);
                }}
              >
                <img src={JBLTune220TWS2} alt="" className="w-full" />
              </div>
              <div
                className="w-[90px] cursor-pointer mx-[10px] border border-[#ccc]"
                onClick={() => {
                  setMainImage(JBLTune220TWS1);
                }}
              >
                <img src={JBLTune220TWS1} alt="" className="w-full" />
              </div>
            </div>
          </div>
          <div className="w-7/12 flex flex-col gap-y-5 py-5 text-lg">
            <div className="text-2xl font-bold">JBL TUNE 750TNC</div>
            <div className="">Brand: JBL</div>
            <div className="flex gap-x-3">
              <div className="">Rating: </div>
              <Rating value={3}></Rating>
            </div>
            <div className="">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Perspiciatis possimus eligendi quae incidunt ipsum? Impedit maxime
              ipsa mollitia, rerum doloribus soluta nemo corrupti, delectus non
              reprehenderit ratione necessitatibus aspernatur expedita.
            </div>
            <div className="text-3xl text-red-800">$2345</div>
            <div className="flex gap-x-2 h-10 items-center ">
              <div
                className="w-10 h-full flex justify-center items-center text-lg border-2 border-black p-2 cursor-pointer select-none"
                onClick={() =>
                  setQuantity(quantity <= 1 ? quantity : quantity - 1)
                }
              >
                -
              </div>
              <input
                type="text"
                value={quantity}
                className=" text-center p-2 outline-none border-2 border-black text-[#ccc] h-full w-[120px]"
              />
              <div
                className="w-10 h-full flex justify-center items-center text-lg border-2 border-black p-2 cursor-pointer select-none"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </div>
            </div>
            <NewButton
              className="w-[150px] p-3"
              text="Add to cart"
              onClick={() => dispatch(addOrderItem({ name: "test" }))}
            ></NewButton>
          </div>
        </div>
        <div className="container">
          <TabContent description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, consectetur porro expedita, praesentium ipsum illo tempore ipsa eum earum, voluptatem inventore possimus sit vitae? Cupiditate itaque molestias fugiat consectetur repellat!"></TabContent>
        </div>
        <div className="my-5">
          <div className="text-2xl font-bold uppercase text-center">
            Related Product
          </div>
          <div className="grid grid-cols-4 gap-2">
            {products.map((item) => (
              <Pro item={item}></Pro>
            ))}
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default Detail;
