import NewLayout from "components/layout/NewLayout";
import HomeSpecialPro from "module/HomeRework/HomeSpecialPro";
import HomeBanner from "module/HomeRework/HomeBanner";
import HomeLatest from "module/HomeRework/HomeLatest";
import HomePromotion from "module/HomeRework/HomePromotion";
import React from "react";
import HomeBestSelling from "module/HomeRework/HomeBestSelling";
import HomeLatestBlog from "module/HomeRework/HomeLatestBlog";

const Home = () => {
  return (
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
