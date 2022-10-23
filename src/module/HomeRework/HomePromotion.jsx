import { headphone, JBLQuantum, WirelessEarbuds } from "asset/image/image";
import React from "react";
import { useSelector } from "react-redux";
const list = [
  {
    name: "Headphone & Earbuds",
    img: headphone,
  },
  {
    name: "JBL Quantum Series",
    img: JBLQuantum,
  },
  {
    name: "True Wireless Earbuds",
    img: WirelessEarbuds,
  },
];
const HomePromotion = () => {
  const { isMobile } = useSelector((state) => state.stateDevide);
  return (
    <div className="p-2 my-8">
      <div className={`flex gap-x-4 ${isMobile ? "flex-col gap-y-2" : ""}`}>
        {list.map((item) => (
          <div
            className={`${
              isMobile ? "w-full h-[180px]" : " w-1/3 h-[140px]"
            } bg-slate-300  rounded relative px-4 py-3 flex flex-col justify-between promotion`}
          >
            <div className="text-xl font-bold ">{item.name}</div>
            <div className="border-2 border-black w-[120px] p-2 flex justify-center h-10 items-center cursor-pointer text-[#fff] duration-200 bg-[#000]  hover:text-[#000] uppercase text-md hover:bg-[#fff]">
              Shop now
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-2">
              <img
                src={item.img}
                alt=""
                className="scale-100 max-h-[100px] promotion-img duration-200"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePromotion;
