import React, { useEffect, useState } from "react";
// import SwiperCore, { Virtual, Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/virtual";
import { Product } from "components/product";
import { Fade } from "react-reveal";
import { useDispatch, useSelector } from "react-redux";
import { PHONE_BREAKPOINT } from "constant/breakpoint";
import { getAllProductsAction } from "features/product/productSlice";
const HomeFeature = () => {
  const [my_swiper, set_my_swiper] = useState({});
  const { isMobile } = useSelector((state) => state.stateDevide);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);
  return (
    <Fade left cascade>
      <div
        className={`${
          !isMobile ? "w-[1170px]" : `w-[${PHONE_BREAKPOINT}px]`
        } mx-auto my-5`}
      >
        <div className="flex w-full justify-between mb-4 items-center h-[50px]">
          <h3 className="text-black">Products feature</h3>
          <div className="flex gap-4">
            <div
              className="flex justify-center items-center bg-white border rounded-lg text-black w-10 h-10 cursor-pointer"
              onClick={() => my_swiper.slidePrev()}
            >
              <ion-icon name="chevron-back-outline"></ion-icon>
            </div>
            <div
              className="flex justify-center items-center bg-white border rounded-lg text-black w-10 h-10 cursor-pointer"
              onClick={() => my_swiper.slideNext()}
            >
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
          </div>
        </div>
        {products.length > 0 && (
          <Swiper
            spaceBetween={50}
            slidesPerView={`${isMobile ? 2.75 : 5.5}`}
            onInit={(ev) => {
              set_my_swiper(ev);
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Product product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </Fade>
  );
};

export default HomeFeature;
