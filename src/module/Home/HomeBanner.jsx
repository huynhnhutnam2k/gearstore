import React from "react";
import Bounce from "react-reveal/Bounce";
import { Link } from "react-router-dom";
import Image from "./banner.png";
import { Zoom } from "react-reveal";
import { Button } from "components/button";
const HomeBanner = () => {
  return (
    <div className="w-full h-[70vh] p-[100px] bg-gradient-to-br from-green-500 to-green-200 flex">
      <div className="w-1/2 h-full ">
        <Bounce bottom cascade>
          <div className="flex flex-col justify-between h-full w-full">
            <div>
              <h1 className="text-white uppercase font-bold text-[20px] ">
                Welcome to my website
              </h1>
              <p className="text-white font-thin text-[14px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                veniam maiores magni ducimus inventore nisi quod reprehenderit
                soluta, alias quaerat minus voluptatum, tempore dolorum maxime
                eum, velit illo nihil molestiae.
              </p>
            </div>
            <Button kind="secondary">
              <Link to="/product">Shop now</Link>
            </Button>
          </div>
        </Bounce>
      </div>
      <Zoom center>
        <div className="w-1/2 h-full py-4 px-8 ">
          <img
            src={Image}
            alt=""
            className="rounded-md w-full h-full object-cover"
          />
        </div>
      </Zoom>
    </div>
  );
};

export default HomeBanner;
