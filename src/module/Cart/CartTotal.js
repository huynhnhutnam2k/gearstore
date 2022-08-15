import { Button } from "components/button";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartTotal = () => {
  const { total } = useSelector((state) => state.cart);
  // console.log(total);
  return (
    <div className="w-full max-w-[30%]">
      <table className="w-full ">
        <thead className="bg-gradient-to-br from-[#1DC071] to-[#A4D96C] text-white text-center">
          <tr className="">
            <th className="p-2">Total</th>
          </tr>
        </thead>
        <tbody className="border-l border-r">
          <tr className="">
            <td className="p-2">Subtotal : {total}</td>
          </tr>
          <tr className="">
            <td className="p-2">Ship : $30</td>
          </tr>
          <tr className="">
            <td className="p-2">Total : {total + 30}</td>
          </tr>
          <tr>
            <td className="">
              <Link to="/checkout">
                <Button>Chọn thông tin thanh toán</Button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartTotal;
