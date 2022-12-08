import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  JBLQuantumONE,
  headphone,
  JBLJR0310BT1,
} from "../../asset/image/image";
import SwiperCore, { Autoplay } from "swiper";
import { useSelector } from "react-redux";
const slide = [
  {
    name: "JBL Quantum ONE",
    title: "Ipsum dolor",
    img: JBLQuantumONE,
  },
  {
    name: "JBL TUNE 750TNC",
    title: "Next-gen design",
    img: headphone,
  },
  {
    name: "JBL JR 310BT",
    title: "Consectetur Elit",
    img: JBLJR0310BT1,
  },
];
const HomeBanner = () => {
  SwiperCore.use([Autoplay]);

  return (
    <div className="banner h-[70vh]">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {slide.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const HeroSlideItem = ({ item, className }) => {
  const { isMobile } = useSelector((state) => state.stateDevide);
  return (
    <div className={`mt-5 h-full hero-item relative ${className}`}>
      <div className="hero-item-content flex container justify-between items-center ">
        <div className="flex flex-col w-3/5 gap-y-4 z-[200] text-black hero-item-info">
          <div className="uppercase font-bold text-xl name">{item.name}</div>
          <div className="capitalize text-3xl font-bold title">
            {item.title}
          </div>
          <div className={`${isMobile ? "truncate" : ""}text-lg lorem`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            reiciendis alias suscipit. Repellat quia omnis expedita, sequi quis
            est iusto ex pariatur recusandae! Eveniet cumque officiis fuga
            similique vel ipsam! Ex maxime omnis sapiente odit odio provident
            impedit nulla iste suscipit accusamus. Sunt laudantium dolore
            delectus asperiores amet mollitia sequi unde exercitationem
            quibusdam earum accusantium, ut rerum porro quo eveniet! Ratione
            nisi eaque neque placeat esse aperiam cupiditate necessitatibus.
            Nobis accusamus quae repellat suscipit, maiores quod. Exercitationem
          </div>
          <div className="text-center p-2 w-[120px] border-2 border-black uppercase text-[#fff] font-bold bg-[#000] duration-200 hover:text-[#000] hover:bg-[#fff]">
            Shop now
          </div>
        </div>
        <div className="hero-item-poster">
          <img src={`${item.img}`} alt="" />
        </div>
      </div>
    </div>
  );
};
export default HomeBanner;
