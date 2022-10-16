import React from "react";
import {
  headphone,
  JBLQuantum,
  WirelessEarbuds,
} from "../../asset/image/image";
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
const HomeSpecial = () => {
  return (
    <div className="w-full h-[120px] px-4 flex gap-x-3 my-10">
      {list.map((item) => (
        <div className="w-1/3 rounded bg-slate-200 h-full relative flex flex-col p-2 justify-between">
          <p>{item.name}</p>
          <div className="border-2 border-black w-[120px] p-2 bg-black text-white flex justify-center items-center hover:bg-white">
            Shop now
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2">
            <img
              src={item.img}
              alt=""
              className="max-h-[100px] object-cover scale-100 duration-100 hover:scale-125"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeSpecial;
