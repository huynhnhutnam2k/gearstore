import Layout from "components/layout/layout";
import CartList from "module/Cart/CartList";
import CartTotal from "module/Cart/CartTotal";
import React from "react";

const Cart = () => {
  return (
    <Layout>
      <div className="w-full max-w-[1200px] mx-auto flex gap-x-5 mt-5">
        <CartList></CartList>
        <CartTotal></CartTotal>
      </div>
    </Layout>
  );
};

export default Cart;
