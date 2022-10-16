import { JBL_Quantum400, JBL_TUNE220TWS } from "asset/image/image";
import React from "react";

const HomeLatestBlog = () => {
  return (
    <div className="">
      <div className="container">
        <div className="uppercase text-3xl font-bold text-black flex justify-center">
          Latest blog
        </div>
        <div className="my-20 flex ">
          <div className="w-1/2">
            <img src={JBL_Quantum400} alt="" className="w-full object-cover" />
          </div>
          <div className="p-5 w-1/2 flex flex-col gap-y-5 justify-center">
            <div className="text-2xl font-semibold uppercase">
              Lorem ipsum, dolor sit amet consectetur{" "}
            </div>
            <div className="">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut et
              veniam omnis officia quidem distinctio possimus aliquam quisquam
              aspernatur saepe quos necessitatibus quis, nemo soluta, earum in
              quod vel recusandae!
            </div>
            <div className="w-[120px] p-2 border-2 flex justify-center uppercase border-black bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] duration-200">
              Read more
            </div>
          </div>
        </div>
        <div className="my-20 flex ">
          <div className="p-5 w-1/2 flex flex-col gap-y-5 justify-center">
            <div className="text-2xl font-semibold uppercase">
              Lorem ipsum, dolor sit amet consectetur{" "}
            </div>
            <div className="">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut et
              veniam omnis officia quidem distinctio possimus aliquam quisquam
              aspernatur saepe quos necessitatibus quis, nemo soluta, earum in
              quod vel recusandae!
            </div>
            <div className="w-[120px] p-2 border-2 flex justify-center uppercase border-black bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] duration-200">
              Read more
            </div>
          </div>
          <div className="w-1/2">
            <img src={JBL_TUNE220TWS} alt="" className="w-full object-cover" />
          </div>
        </div>
        <div className="mx-auto cursor-pointer w-[120px] p-2 border-2 flex justify-center uppercase border-black bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] duration-200">
          Read more
        </div>
      </div>
    </div>
  );
};

export default HomeLatestBlog;
