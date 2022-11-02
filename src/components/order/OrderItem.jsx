import React from "react";

const OrderItem = ({ i }) => {
  return (
    <div className="flex w-full gap-x-2  p-4 border-b-2 ">
      <div className="w-1/4">
        <img src={i.image2} alt="" className="w-[200px] h-full object-cover" />
      </div>
      <div className="flex flex-col gap-y-2 justify-center capitalize">
        <div className="">{i.name}</div>
        <div className="">Số lượng: {i.qty}</div>
        <div className="">Đơn giá: {i.price}</div>
      </div>
    </div>
  );
};

export default OrderItem;
