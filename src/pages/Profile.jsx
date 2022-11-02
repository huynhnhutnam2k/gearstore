/* eslint-disable react-hooks/exhaustive-deps */
import NewLayout from "components/layout/NewLayout";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { changeInfo, reset } from "features/users/userSlice";
import { toast } from "react-toastify";
const Profile = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { isMobile } = useSelector((state) => state.stateDevide);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: userInfo?.email,
      username: userInfo?.username,
      newPassword: "",
      currentPassword: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(changeInfo({ body: values, token: userInfo?.token }));
    },
  });
  useEffect(() => {
    if (!userInfo) {
      <Navigate to="/"></Navigate>;
    }
  }, []);
  const toastId = useRef(null);
  const { isError, isLoading, msg, isSuccess } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (isError) {
      toast.dismiss(toastId.current);
      toast.error("Current password is incorrect", { containerId: "A" });
      dispatch(reset());
    } else if (isSuccess) {
      toast.dismiss(toastId.current);
      toast.success(msg, { containerId: "A" });
      dispatch(reset());
    } else if (isLoading) {
      toastId.current = toast.info("Please wait...", {
        containerId: "A",
        autoClose: false,
      });
    }
  }, [isError, isLoading, isSuccess, msg]);
  return (
    <NewLayout>
      <div className={`container ${isMobile ? "" : "p-5"}`}>
        <div
          className={`flex w-full gap-x-2 ${
            isMobile ? "flex-col min-h-[500px]" : ""
          }`}
        >
          <div
            className={`${isMobile ? "w-full " : "w-4/12"} shadow-lg relative`}
          >
            <div className=" w-full h-[100px]">
              <img
                src="https://gust.com/assets/blank_slate/Gust_Profile_CoverPhoto_Blank-21edf1e2890708d5a507204f49afc10b7dc58eb7baea100b68a1bc2c96948297.png"
                alt=""
                className="w-full h-full object-cover rounded-tr-[8px] rounded-tl-[8px]"
              />
            </div>
            <div className="flex justify-end p-4 min-h-[100px]">
              <div className="font-bold capitalize">{userInfo?.username}</div>
              <div className="">{userInfo?.createdAt}</div>
            </div>
            <div className="w-full bg-green-200 uppercase p-2">
              cài đặt hồ sơ
            </div>
            <div className="rounded-br-[8px] rounded-bl-[8px] p-2 w-full uppercase">
              <Link to="/order" className="">
                Danh sách đơn hàng
              </Link>
            </div>
            <div className="absolute top-[70px] left-10">
              <img
                src={userInfo?.avatar}
                alt=""
                className="w-[60px] h-[60px] object-cover rounded-full shadow-lg"
              />
            </div>
          </div>
          {!userInfo?.providerId && (
            <div className={`${isMobile ? "" : "w-8/12"} p-2`}>
              <div className="flex gap-x-2">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Tên người dùng</label>
                  <input
                    type="text"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    name="username"
                    className="w-full p-2 border-2 border-black text-[#ccc] outline-none text-[16px]"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    value={formik.values.email}
                    // onChange={formik.handleChange}
                    name="email"
                    className="w-full p-2 border-2 border-black text-[#ccc] outline-none text-[16px] bg-slate-100"
                  />
                </div>
              </div>
              <div className="flex gap-x-2 mt-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    name="currentPassword"
                    className="w-full p-2 border-2 border-black text-[#ccc] outline-none text-[16px]"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Mật khẩu mới</label>
                  <input
                    type="password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    name="newPassword"
                    className="w-full p-2 border-2 border-black text-[#ccc] outline-none text-[16px]"
                  />
                </div>
              </div>
              <div
                className="w-full p-2 text-[#fff] uppercase bg-[#000] hover:text-[#000] cursor-pointer hover:bg-[#fff] duration-200 border-2 border-black flex justify-center mt-4"
                onClick={formik.handleSubmit}
              >
                Cập nhật
              </div>
            </div>
          )}
        </div>
      </div>
    </NewLayout>
  );
};

export default Profile;
