/* eslint-disable react-hooks/exhaustive-deps */
import { cancelOrder } from "app/orderSlice";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "./OrderItem";

const OrderLayout = ({ item }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  return (
    <div className="w-full flex flex-col gap-y-4  shadow-lg rounded mb-4">
      {item.orderItems.map((i) => (
        <OrderItem i={i}></OrderItem>
      ))}
      <div className="flex items-center gap-x-2">
        <div className="flex flex-col gap-y-2 p-2">
          <div className="">
            Order at {moment(item.createdAt).startOf("hour").fromNow()}
          </div>
          <div className="">
            Shipping Address: {item.shippingAddress.city},{" "}
            {item.shippingAddress.districts}, {item.shippingAddress.ward},{" "}
            {item.shippingAddress.address}
          </div>
          <div className="">Status: {item.status}</div>
          <div className="">Total: {item.totalPrice}</div>
        </div>
        {item.status === "pending" || item.status === "processing" ? (
          <div
            className="w-[200px] bg-[#000] text-[#fff] text-center p-2  uppercase hover:bg-[#fff] hover:text-[#000] duration-200 border-2 border-black cursor-pointer ml-auto mr-4 mb-2"
            onClick={() =>
              dispatch(
                cancelOrder(item?._id, userInfo?.token, userInfo?.providerId)
              )
            }
          >
            Cancel Order
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OrderLayout;
