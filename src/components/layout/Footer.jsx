/* eslint-disable react-hooks/exhaustive-deps */
import { registerPromotion, reset } from "features/users/userSlice";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const handleRegister = () => {
    dispatch(registerPromotion(email));
  };
  const { isSuccess, isLoading, isError } = useSelector((state) => state.user);
  const toastId = useRef(null);
  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.dismiss(toastId.current);
      toast.success("Register success", { containerId: "A" });
      dispatch(reset());
    } else if (!isLoading && isError) {
      toast.dismiss(toastId.current);
      toast.error("Register error", { containerId: "A" });
      dispatch(reset());
    } else if (isLoading) {
      toastId.current = toast.info("Loading", { containerId: "A" });
    }
  }, [isSuccess, isLoading, isError]);
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL"
                className="w-[70%] outline-none p-2 border-2 border-black"
              />
              <button
                className="p-2 border-2 border-[#000] bg-[#000] text-[#fff] hover:text-[#000] hover:bg-[#fff] duration-200 outline-none uppercase cursor-pointer w-[30%] flex justify-center items-center "
                onClick={handleRegister}
              >
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
