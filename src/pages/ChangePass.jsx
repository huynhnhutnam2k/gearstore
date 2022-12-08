import { changePassord, reset } from "app/otpSlice";
import NewLayout from "components/layout/NewLayout";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChangePass = () => {
  const [pass, setPass] = useState("");
  const { email, isSuccess, isError, isChangeSuccess } = useSelector(
    (state) => state.otp
  );
  const dispatch = useDispatch();
  const handleChange = () => {
    const body = {
      email: email,
      password: pass,
    };
    dispatch(changePassord(body));
  };
  useEffect(() => {
    reset();
  }, [isSuccess, isError]);
  return (
    <NewLayout>
      <div className="container p-5">
        <div className="min-h-[250px]">
          {isChangeSuccess && (
            <div className="bg-green-300 text-black text-sm w-[500px] mx-auto p-2 rounded">
              Thay đổi mật khẩu thành công quay trở lại đăng nhập
            </div>
          )}
          <div
            className={`mx-auto ${
              isChangeSuccess ? "mt-4" : "mt-10"
            } w-[500px] p-4 rounded-lg shadow-lg`}
          >
            <div className="">Nhập mật khẩu mới</div>
            <input
              type="text"
              className="w-full h-10 p-2 rounded border border-[#ccc] outline-none"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <div
              className="w-full h-10 p-2 flex justify-center items-center text-white mt-2 bg-[#000] cursor-pointer"
              onClick={handleChange}
            >
              Đổi mật khẩu
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default ChangePass;
