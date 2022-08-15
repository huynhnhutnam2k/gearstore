import Layout from "components/layout/layout";
import { PHONE_BREAKPOINT } from "constant/breakpoint";
import ProductBanner from "module/Product/ProductBanner";
import ProductLayout from "module/Product/ProductLayout";
import ProductNav from "module/Product/ProductNav";
import React from "react";
import { useSelector } from "react-redux";

const Product = () => {
  const { isMobile } = useSelector((state) => state.stateDevide);

  return (
    <Layout>
      <ProductBanner></ProductBanner>
      <div
        className={`flex w-full ${
          !isMobile ? "max-w-[1200px]" : `max-w-[${PHONE_BREAKPOINT}px]`
        } mx-auto mt-8 gap-x-2`}
      >
        {!isMobile && <ProductNav></ProductNav>}
        <ProductLayout></ProductLayout>
      </div>
    </Layout>
  );
};

export default Product;
