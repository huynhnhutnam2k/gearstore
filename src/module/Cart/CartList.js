import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCart } from "./cartSlice";

const CartList = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart?.length, dispatch]);
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className="w-full max-w-[70%]">
      <table className="table-auto w-full text-center">
        <thead className="bg-gradient-to-br from-[#1DC071] to-[#A4D96C] text-white">
          <tr className="">
            <th className="p-2">Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart &&
            cart.length > 0 &&
            cart.map((item) => (
              <tr className="border-b-[#ccc] border-b" key={item.id}>
                <td className="flex flex-col max-h-[250p] p-2">
                  <img
                    src={`${item.image}`}
                    alt=""
                    className="max-h-[200px] max-w-[200px] w-full object-cover"
                  />
                  <div
                    className="text-left hover:text-red-400 cursor-pointer"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </div>
                </td>
                <td>{item.price}</td>
                <td>
                  <select
                    name=""
                    id=""
                    value={item.quantity}
                    onChange={(e) => {
                      const newItem = {
                        id: item.id,
                        price: item.price,
                        quantity: +e.target.value,
                        image: item.image,
                        name: item.name,
                        total: +item.price * +e.target.value,
                      };
                      dispatch(updateCart(newItem));
                    }}
                    className="outline-none border rounded-md"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </td>
                <td>{item.total}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartList;
