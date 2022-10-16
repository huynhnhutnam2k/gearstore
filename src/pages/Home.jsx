// import Layout from "components/layout/layout";
import NewLayout from "components/layout/NewLayout";
// import HomeArrival from "module/Home/HomeArrival";
// // import HomeBanner from "module/Home/HomeBanner";
// import HomeCollect from "module/Home/HomeCollect";
// import HomeDelivery from "module/Home/HomeDelivery";
// import HomeFeature from "module/Home/HomeFeature";
// import HomeSpecial from "module/Home/HomeSpecial";
import HomeSpecialPro from "module/HomeRework/HomeSpecialPro";
import HomeBanner from "module/HomeRework/HomeBanner";
import HomeLatest from "module/HomeRework/HomeLatest";
import HomePromotion from "module/HomeRework/HomePromotion";
import React from "react";
import HomeBestSelling from "module/HomeRework/HomeBestSelling";
import HomeLatestBlog from "module/HomeRework/HomeLatestBlog";
const Home = () => {
  return (
    // <Layout>
    //   <HomeBanner></HomeBanner>
    //   <HomeSpecial></HomeSpecial>
    //   <HomeFeature></HomeFeature>
    //   <HomeArrival></HomeArrival>
    //   {/* <HomeCollect></HomeCollect> */}
    //   <HomeDelivery></HomeDelivery>
    // </Layout>
    <NewLayout>
      <HomeBanner></HomeBanner>
      <HomePromotion></HomePromotion>
      <HomeLatest></HomeLatest>
      <HomeSpecialPro></HomeSpecialPro>
      <HomeBestSelling></HomeBestSelling>
      <HomeLatestBlog></HomeLatestBlog>
    </NewLayout>
  );
};

export default Home;
