import React from "react";
import Data from "constant/data.json";
import Layout from "components/layout/layout";
import CheckoutAddress from "module/Checkout/CheckoutAddress";
import CheckoutInvoice from "module/Checkout/CheckoutInvoice";
const Checkout = () => {
  console.log(Data);
  return (
    <Layout>
      <div className="w-full max-w-[1200px] mt-8 mx-auto">
        <CheckoutInvoice></CheckoutInvoice>
        <CheckoutAddress></CheckoutAddress>
      </div>
    </Layout>
  );
};

export default Checkout;
