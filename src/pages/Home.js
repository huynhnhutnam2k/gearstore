import Layout from "components/layout/layout";
import HomeArrival from "module/Home/HomeArrival";
import HomeBanner from "module/Home/HomeBanner";
import HomeCollect from "module/Home/HomeCollect";
import HomeDelivery from "module/Home/HomeDelivery";
import HomeFeature from "module/Home/HomeFeature";
import React from "react";
const Home = () => {
  return (
    <Layout>
      <HomeBanner></HomeBanner>
      <HomeFeature></HomeFeature>
      <HomeArrival></HomeArrival>
      <HomeCollect></HomeCollect>
      <HomeDelivery></HomeDelivery>
    </Layout>
  );
};

export default Home;
