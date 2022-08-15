import { BoxIcon, Check, Delivery, PayIcon } from "components/icons";
import React from "react";
import Step1 from "asset/image/arrow-1.png";
import Step2 from "asset/image/arrow-2.png";
import Step3 from "asset/image/arrow-3.png";
const HomeDelivery = () => {
  return (
    <>
      <p className="uppercase font-bold text-center text-[30px] mt-10">
        Step by step to delivery
      </p>
      <div className="flex  w-full max-w-[1170px] mx-auto my-5 h-[150px] items-center gap-x-[40px] justify-center">
        <BoxIcon className="w-[100px] h-[100px]"></BoxIcon>
        {/* <div className="w-[100px"> */}
        <img src={Step1} alt="" className="scale-75 w-[50px] h-[50px]" />
        {/* </div> */}
        <Check className="w-[100px] h-[100px]"></Check>
        <div className="">
          <img src={Step2} alt="" className="scale-75 w-[50px] h-[50px]" />
        </div>
        <Delivery className="w-[100px] h-[100px]"></Delivery>
        <div className="">
          <img src={Step3} alt="" className="scale-75 w-[50px] h-[50px]" />
        </div>
        <PayIcon className="w-[100px] h-[100px]"></PayIcon>
      </div>
    </>
  );
};

export default HomeDelivery;
