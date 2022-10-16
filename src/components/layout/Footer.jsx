import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-slate-300 mt-3">
      <div className="container">
        <div className="flex p-5">
          <div class="w-1/4 col-md-6">
            <h3 class="footer-head">Products</h3>
            <ul class="footer-menu">
              <li>
                <Link to="#">Help center</Link>
              </li>
              <li>
                <Link to="#">Contact us</Link>
              </li>
              <li>
                <Link to="#">product help</Link>
              </li>
              <li>
                <Link to="#">warranty</Link>
              </li>
              <li>
                <Link to="#">order status</Link>
              </li>
            </ul>
          </div>
          <div class="w-1/4 col-md-6">
            <h3 class="footer-head">services</h3>
            <ul class="footer-menu">
              <li>
                <Link to="#">Help center</Link>
              </li>
              <li>
                <Link to="#">Contact us</Link>
              </li>
              <li>
                <Link to="#">product help</Link>
              </li>
              <li>
                <Link to="#">warranty</Link>
              </li>
              <li>
                <Link to="#">order status</Link>
              </li>
            </ul>
          </div>
          <div class="w-1/4 col-md-6">
            <h3 class="footer-head">support</h3>
            <ul class="footer-menu">
              <li>
                <Link to="#">Help center</Link>
              </li>
              <li>
                <Link to="#">Contact us</Link>
              </li>
              <li>
                <Link to="#">product help</Link>
              </li>
              <li>
                <Link to="#">warranty</Link>
              </li>
              <li>
                <Link to="#">order status</Link>
              </li>
            </ul>
          </div>
          <div class="w-1/4 col-md-6 col-sm-12">
            <h3 class="footer-head">ATShop</h3>

            <div class="subscribe flex gap-x-2">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className="w-[70%] outline-none p-2 border-2 border-black"
              />
              <button className="p-2 border-2 border-[#000] bg-[#000] text-[#fff] hover:text-[#000] hover:bg-[#fff] duration-200 outline-none uppercase cursor-pointer w-[30%] flex justify-center items-center ">
                subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
