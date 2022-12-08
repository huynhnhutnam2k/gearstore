/* eslint-disable react-hooks/exhaustive-deps */
import { forgotPassword, reset, setEmail } from "app/otpSlice";
import NewLayout from "components/layout/NewLayout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  // const [otp, setOtp] = useState(new Array(6).fill(0));
  const dispatch = useDispatch();
  const { isError, isLoading, email, isSuccess } = useSelector(
    (state) => state.otp
  );
  const handleSend = () => {
    dispatch(forgotPassword(email));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!isError && !isLoading && isSuccess) {
      dispatch(reset());
      navigate("/confirm");
    }
  }, [isError, isLoading]);

  return (
    <NewLayout>
      <div className="container">
        <div className="min-h-[400px]">
          <div className="w-[500px] p-4 rounded-lg shadow-lg mx-auto my-20 flex flex-col gap-y-2">
            <div className="text-center uppercase ">
              Nhập địa chỉ email để nhận mã otp
            </div>
            <input
              type="text"
              placeholder="Nhập địa chỉ email"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className="w-full p-2 border-2 border-black rounded-md outline-none"
            />
            {isError && (
              <div className="text-sm text-red-500">
                Không tồn tại người dùng này
              </div>
            )}
            <div
              className="w-full p-2 flex items-center justify-center bg-[#000] text-[#fff] border-2 border-black hover:bg-[#fff] hover:text-[#000] duration-200 cursor-pointer"
              onClick={handleSend}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
              ) : (
                <div className="">Nhận mã</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default ForgotPassword;
