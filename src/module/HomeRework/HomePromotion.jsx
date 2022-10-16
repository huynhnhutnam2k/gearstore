import { headphone, JBLQuantum, WirelessEarbuds } from "asset/image/image";
import React from "react";
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
  return (
    <div className="p-2 my-8">
      <div className="flex gap-x-4">
        {list.map((item) => (
          <div className="w-1/3 bg-slate-300 h-[140px] rounded relative px-4 py-3 flex flex-col justify-between promotion ">
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
