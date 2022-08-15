import Layout from "components/layout/layout";
import CartList from "module/Cart/CartList";
import CartTotal from "module/Cart/CartTotal";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);

  return (
    <Layout>
      <h2 className="text-lg text-center my-2">Your Cart</h2>
      {cart?.length > 0 ? (
        <div className="w-full max-w-[1200px] mx-auto flex gap-x-5 mt-5">
          <CartList></CartList>
          <CartTotal></CartTotal>
        </div>
      ) : (
        <h2 className="text-[30px] text-green-400 text-center">
          Your cart is empty,{" "}
          <Link to="/" className="underline">
            {" "}
            click here
          </Link>{" "}
          to buy
        </h2>
      )}
    </Layout>
  );
};

export default Cart;
