import { NewButton } from "components/button";
import NewLayout from "components/layout/NewLayout";
import { Pro } from "components/product";
import { Rating } from "components/rating";
import { TabContent } from "components/tab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import { addOrderItem } from "app/orderSlice";
import { getAllProduct, getAProduct } from "app/productSlice";

import { toast } from "react-toastify";
const Detail = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { product, isLoading, products } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0, "smooth");
    dispatch(getAllProduct());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [mainImage, setMainImage] = useState("");
  useEffect(() => {
    dispatch(getAProduct(id));
    product?._id && setMainImage(product.image1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const { isMobile } = useSelector((state) => state.stateDevide);
  const [quantity, setQuantity] = useState(1);
  const [imageProps, setImageProps] = useState({
    smallImage: {
      alt: "Phasellus laoreet",
      isFluidWidth: true,
      src: product?.image1,
    },
    largeImage: {
      src: product?.image1,
      width: 600,
      height: 600,
    },
    enlargedImageContainerStyle: { background: "#fff", zIndex: 9 },
  });
  useEffect(() => {
    const prop = {
      smallImage: {
        alt: "Phasellus laoreet",
        isFluidWidth: true,
        src: mainImage,
      },
      largeImage: {
        src: mainImage,
        width: 600,
        height: 600,
      },
      enlargedImageContainerStyle: { background: "#fff", zIndex: 9 },
    };
    setImageProps(prop);
  }, [mainImage]);

  const handleAddOrderItem = () => {
    const pro = {
      name: product.name,
      qty: quantity,
      image1: product.image1,
      image2: product.image2,
      price: product.price,
      countInStock: product.countInStock,
      product: product._id,
    };
    dispatch(addOrderItem(pro));
    toast.success("Add successfully", { containerId: "A" });
  };
  return (
    <NewLayout>
      {!isLoading && product?._id && (
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
              Products
            </Link>
            <div className="">
              <ion-icon name="play-forward-outline"></ion-icon>
            </div>
            <Link
              to={`/products/${product._id}`}
              className=" hover:text-red-800 uppercase duration-150"
            >
              {product?.name}
            </Link>
          </div>
          <div className={`flex gap-x-2 ${isMobile ? "flex-col gap-y-2" : ""}`}>
            <div className={`${isMobile ? "w-full" : "w-5/12"} p-5`}>
              <div className="flex justify-center items-center zoom">
                {isMobile ? (
                  <div className="">
                    <img src={mainImage || product.image1} alt="" />
                  </div>
                ) : mainImage !== product.image1 &&
                  mainImage !== product.image2 ? (
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        src: product.image1,
                        alt: "Phasellus laoreet",
                        isFluidWidth: true,
                      },
                      largeImage: {
                        src: product.image2,
                        width: 600,
                        height: 600,
                      },
                      enlargedImageContainerStyle: {
                        background: "#fff",
                        zIndex: 9,
                      },
                    }}
                  />
                ) : (
                  <ReactImageMagnify {...imageProps} />
                )}
              </div>
              <div className="flex justify-center items-center ">
                <div
                  className="w-[90px] cursor-pointer mx-[10px] border border-[#ccc]"
                  onClick={() => {
                    setMainImage(product.image1);
                  }}
                >
                  <img src={product.image1} alt="" className="w-full" />
                </div>
                <div
                  className="w-[90px] cursor-pointer mx-[10px] border border-[#ccc]"
                  onClick={() => {
                    setMainImage(product.image2);
                  }}
                >
                  <img src={product.image2} alt="" className="w-full" />
                </div>
              </div>
            </div>
            <div
              className={`${
                isMobile ? "" : "w-7/12"
              } flex flex-col gap-y-5 py-5 text-lg`}
            >
              <div className="text-2xl font-bold">{product.name}</div>
              <div className="">Brand: JBL</div>
              <div className="flex gap-x-3">
                <div className="">Rating: </div>
                <Rating value={product.rating}></Rating>
              </div>
              <div className="">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Perspiciatis possimus eligendi quae incidunt ipsum? Impedit
                maxime ipsa mollitia, rerum doloribus soluta nemo corrupti,
                delectus non reprehenderit ratione necessitatibus aspernatur
                expedita.
              </div>
              <div className="text-3xl text-red-800">${product.price}</div>
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
                onClick={handleAddOrderItem}
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
            <div
              className={`grid ${
                isMobile ? "grid-cols-2" : "grid-cols-4"
              } gap-2`}
            >
              {products
                .filter(
                  (item) =>
                    item.category._id === product?.category._id &&
                    item._id !== product._id
                )
                .map((item) => (
                  <Pro item={item}></Pro>
                ))}
            </div>
          </div>
        </div>
      )}
    </NewLayout>
  );
};

export default Detail;
