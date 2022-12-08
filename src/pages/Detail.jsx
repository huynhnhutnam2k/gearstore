/* eslint-disable react-hooks/exhaustive-deps */
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
import { getAProduct, getForCategory, resetState } from "app/productSlice";

import { toast } from "react-toastify";
import { useRef } from "react";
import { useLayoutEffect } from "react";
const Detail = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { product, isLoading, products, msg, isError, isSuccess } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0, "smooth");
    document.title = "Chi tiết sản phẩm";
  }, []);
  const [mainImage, setMainImage] = useState("");
  useEffect(() => {
    dispatch(getAProduct(id));
    product?._id && setMainImage(product.image1);
  }, [id]);
  useLayoutEffect(() => {
    product?.category?._id && dispatch(getForCategory(product?.category?._id));
  }, [product]);
  const { isMobile } = useSelector((state) => state.stateDevide);
  const [quantity, setQuantity] = useState(1);
  const [imageProps, setImageProps] = useState({
    smallImage: {
      alt: "Phasellus laoreet",
      isFluidWidth: true,
      src: product?.image[product.image.length - 1],
      width: 500,
      height: 500,
    },
    largeImage: {
      src: product?.image[product.image.length - 1],
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
        width: 500,
        height: 500,
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
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      salePercent: product.salePercent,
      product: product._id,
    };
    dispatch(addOrderItem(pro));
    toast.success("Thêm giỏ hàng thành công", { containerId: "A" });
  };
  const toastId = useRef();
  useEffect(() => {
    if (isSuccess) {
      toast.dismiss(toastId.current);
    } else if (isError && !isLoading) {
      toast.dismiss(toastId.current);
      toast.error("Bình luân thất bại", { containerId: "A" });
      dispatch(resetState());
    } else if (msg !== "" && !isLoading) {
      toast.dismiss(toastId.current);
      toast.success("Bình luận thành công", { containerId: "A" });
      dispatch(resetState());
    } else if (isLoading) {
      toastId.current = toast.info("Đang xử lý...", {
        containerId: "A",
        autoClose: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, isError, isLoading]);
  return (
    <NewLayout>
      {!isLoading && product?._id && (
        <div className="container">
          <div className="flex p-5 gap-x-3 gap-y-3">
            <Link to="/" className="hover:text-red-800 uppercase duration-150">
              Trang chủ
            </Link>
            <div className="">
              <ion-icon name="play-forward-outline"></ion-icon>
            </div>
            <Link
              to="/products"
              className=" hover:text-red-800 uppercase duration-150"
            >
              Sản phẩm
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
                    <img
                      src={mainImage || product.image[product.image.length - 1]}
                      alt=""
                      className="w-[500px] h-[500px] object-cover"
                    />
                  </div>
                ) : product.image.every((item) => item !== mainImage) ? (
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        src: product.image[product.image.length - 1],
                        alt: "Phasellus laoreet",
                        isFluidWidth: true,
                        width: 500,
                        height: 500,
                      },
                      largeImage: {
                        src: product.image[product.image.length - 1],
                        width: 600,
                        height: 600,
                        isFluidWidth: true,
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
              <div className="flex justify-center items-center max-w-[500px] overflow-auto">
                {product.image.map((item) => (
                  <div
                    className={`w-[90px] h-[90px] cursor-pointer mx-[10px] border ${
                      item === mainImage ? "border-red-500" : "border-[#ccc]"
                    } `}
                    onClick={() => {
                      setMainImage(item);
                    }}
                  >
                    <img
                      src={item}
                      alt=""
                      className="w-[90px] h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`${
                isMobile ? "" : "w-7/12"
              } flex flex-col gap-y-5 py-5 text-lg`}
            >
              <div className="text-2xl font-bold uppercase">{product.name}</div>
              <div className="">Thể loại: {product.category.name}</div>
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

              <div className="text-3xl text-red-800">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </div>
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
                className="w-[216px] p-3"
                text="Thêm vào giỏ hàng"
                onClick={handleAddOrderItem}
              ></NewButton>
            </div>
          </div>
          <div className="container">
            <TabContent
              description={product.description}
              reviews={product.reviews}
            ></TabContent>
          </div>
          <div className="my-5">
            <div className="text-2xl font-bold uppercase text-center">
              sản phẩm liên quan
            </div>
            {products?.length === 0 ? (
              <div className="px-16 mt-2">
                <div className="p-4 bg-yellow-200 text-center text-sm uppercase">
                  Không có sản phẩm liên quan
                </div>
              </div>
            ) : (
              <div
                className={`grid ${
                  isMobile ? "grid-cols-2" : "grid-cols-4"
                } gap-2`}
              >
                {products?.map((item) => (
                  <Pro item={item}></Pro>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </NewLayout>
  );
};

export default Detail;
