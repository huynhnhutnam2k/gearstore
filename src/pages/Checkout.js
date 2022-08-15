import React from "react";
import Layout from "components/layout/layout";
import CheckoutAddress from "module/Checkout/CheckoutAddress";
import CheckoutInvoice from "module/Checkout/CheckoutInvoice";
const Checkout = () => {
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
