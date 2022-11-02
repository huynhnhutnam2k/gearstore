/* eslint-disable react-hooks/exhaustive-deps */
import { confirmOTP } from "app/otpSlice";
import NewLayout from "components/layout/NewLayout";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConfirmOTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const dispatch = useDispatch();
  const handleChange = (element, index) => {
    setOtp([...otp.map((d, i) => (i === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const handleSubmit = () => {
    dispatch(confirmOTP(otp.join("")));
  };
  const { isSuccess, isLoading, isError } = useSelector((state) => state.otp);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && isSuccess && !isError) {
      navigate("/changePassword");
    }
  }, [isSuccess, isLoading]);
  return (
    <NewLayout>
      <div className="container">
        <div className="min-h-[400px]">
          <div className="w-[500px] p-4 shadow-lg rounded-lg mx-auto my-20">
            <div className="uppercase text-center mb-2">
              Vui lòng nhập mã otp của bạn
            </div>
            <div className="flex gap-x-4 justify-center">
              {otp.map((data, i) => (
                <input
                  type="text"
                  maxLength={1}
                  value={data}
                  key={i}
                  onChange={(e) => handleChange(e.target, i)}
                  name="otp"
                  onFocus={(e) => e.target.select()}
                  className="w-10 h-10 rounded-md border border-[#ccc] text-center"
                />
              ))}
            </div>
            {isError && (
              <div className="text-sm text-red-500">
                Mã otp sai hoặc hết hạn
              </div>
            )}
            <div
              className={`w-full flex justify-center items-center h-10 bg-[#000] text-[#fff] hover:text-[#000] hover:bg-[#fff] border-2 border-black duration-200 ${
                otp.length === 6 && otp.every((item) => item !== "")
                  ? "cursor-pointer "
                  : "cursor-none pointer-events-none"
              } mt-4`}
              onClick={handleSubmit}
            >
              Xác nhận otp
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default ConfirmOTP;
