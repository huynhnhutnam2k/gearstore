import React from "react";
import { useSelector } from "react-redux";

const CheckoutInvoice = () => {
  const { cart, total } = useSelector((state) => state.cart);
  return (
    <div className="w-full max-w-[70%] mx-auto">
      <div className="w-full p-2 bg-green-400 text-center text-white">
        Tạm tính
      </div>
      <table className="w-full mt-2 text-center">
        <thead className="">
          <tr>
            <th className="w-1/4 p-2 text-black ">Sản phẩm</th>
            <th className="w-1/4 p-2 text-black ">Đơn giá</th>
            <th className="w-1/4 p-2 text-black ">Số lượng</th>
            <th className="w-1/4 p-2 text-black ">Thành tiền</th>
          </tr>
        </thead>
        <tbody className="py-2">
          {cart &&
            cart.length > 0 &&
            cart.map((item) => (
              <tr>
                <td className="flex flex-col max-h-[250p] p-2">
                  <img
                    src={`${item.image}`}
                    alt=""
                    className="max-h-[200px] max-w-[200px] w-full object-cover"
                  />
                  <div className="text-left hover:text-red-400 cursor-pointer">
                    Remove
                  </div>
                </td>
                <td className="w-1/4  max-h-[250p] p-2">
                  <span className="text-sm">{item.price}</span>
                </td>
                <td className="w-1/4  max-h-[250p] p-2">
                  <span className="text-sm">{item.quantity}</span>
                </td>
                <td className="w-1/4  max-h-[250p] p-2">
                  <span className="text-sm">{item.total}</span>
                </td>
              </tr>
            ))}
          <tr className="border-t border-t-[#ccc] mt-2">
            <td className="text-left">Tổng cộng</td>
            <td className="text-right"></td>
            <td className="text-right"></td>
            <td className="text-center">{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CheckoutInvoice;
