import { addOrderItem } from "app/orderSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Pro = ({ item }) => {
  const dispatch = useDispatch();
  const { isMobile } = useSelector((state) => state.stateDevide);
  const handleClick = (item) => {
    const product = {
      image: item.image,
      name: item.name,
      price: item.price,
      product: item._id,
      countInStock: item.countInStock,
      salePercent: item.salePercent,
      qty: 1,
    };
    dispatch(addOrderItem(product));
    toast.success("Thêm vào giỏ hàng thành công", { containerId: "A" });
  };
  return (
    <>
      <div className="w-full pro relative overflow-hidden">
        {item.countInStock === 0 && (
          <div className="absolute z-auto bg-gradient-to-r from-slate-300 to-slate-400 opacity-30 w-full h-full"></div>
        )}
        <div className="pro-top ">
          {item.image.slice(0, 2).map((item) => (
            <img src={item} alt="" type="image/webp" />
          ))}
        </div>
        {item.salePercent !== 0 && (
          <div className="absolute top-5 right-5 w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#83c5be] text-xs text-white">
            {item.salePercent}%
          </div>
        )}
        {item.countInStock > 0 ? (
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 flex duration-300 pro-special ${
              isMobile ? "opacity-100 -translate-y-[70px]" : ""
            }`}
          >
            <div className="flex gap-2 justify-center items-center">
              <Link
                to={`/products/${item._id}`}
                className={`p-2 border-2 border-[#000] bg-[#000] text-[#fff] hover:text-[#000] hover:bg-[#fff] duration-300 outline-none uppercase cursor-pointer flex items-center text-xs h-[41px] ${
                  item.countInStock === 0
                    ? "select-none pointer-events-none cursor-not-allowed disabled:cursor-not-allowed"
                    : ""
                }`}
              >
                Xem ngay
              </Link>
              <div
                className="p-2 border-2 border-[#000] bg-[#000] text-[#fff] hover:text-[#000] hover:bg-[#fff] duration-200 outline-none uppercase cursor-pointer w-[41px] flex justify-center items-center h-[41px]"
                onClick={() => handleClick(item)}
              >
                <ion-icon name="cart-outline"></ion-icon>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute top-5 right-5 w-[50px] h-[50px] flex justify-center items-center rounded-full bg-red-400 text-xs text-white">
            Hết hàng
          </div>
        )}

        <div className="pro-bottom flex flex-col justify-center items-center h-10">
          <div className="max-w-[80%] truncate capitalize">{item.name}</div>
          {item.salePercent !== 0 ? (
            <div className="">
              <span className="text-red-400 line-through">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.price)}
              </span>{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(+item.price - (+item.price * item.salePercent) / 100)}
            </div>
          ) : (
            <div className="">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.price)}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pro;
