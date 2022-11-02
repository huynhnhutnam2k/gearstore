import NewLayout from "components/layout/NewLayout";
import React, { useRef } from "react";
import { useEffect } from "react";
import { Fade } from "react-reveal";
import { Link } from "react-router-dom";

const ThankYou = () => {
  const tickRef = useRef(null);
  const textRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      tickRef.current.classList.add("hidden");
      textRef.current.classList.remove("hidden");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="wrapper duration-200" ref={tickRef}>
        {" "}
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          {" "}
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />{" "}
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
      <div className="hidden" ref={textRef}>
        <NewLayout>
          <div className="flex justify-center items-center flex-col min-h-[400px] gap-y-3">
            <Fade top>
              <div className="w-10 h-10 text-3xl">
                <ion-icon name="checkmark-circle-outline"></ion-icon>
              </div>
            </Fade>
            <Fade bottom effect="fadeInDown">
              <div className=" text-2xl uppercase ">
                Cảm ơn quý khách, hẹn gặp lại
              </div>
            </Fade>
            <Fade bottom cascade effect="fadeInDown">
              <Link
                to="/"
                className=" text-xl uppercase p-2 border-2 border-black bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] cursor-pointer"
              >
                Tiếp tục mua sắm
              </Link>
            </Fade>
          </div>
        </NewLayout>
      </div>
    </>
  );
};

export default ThankYou;
