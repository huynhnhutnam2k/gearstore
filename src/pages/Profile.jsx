import NewLayout from "components/layout/NewLayout";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useFormik } from "formik";
const Profile = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { isMobile } = useSelector((state) => state.stateDevide);
  const formik = useFormik({
    initialValues: {
      email: userInfo?.email,
      username: userInfo?.username,
      newPassword: "",
      currentPassword: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  useEffect(() => {
    if (!userInfo) {
      <Navigate to="/"></Navigate>;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              PROFILE SETTINGS
            </div>
            <div className="rounded-br-[8px] rounded-bl-[8px] p-2 w-full">
              <Link to="/order" className="">
                ORDER LIST
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
                  <label htmlFor="">Username</label>
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
                    onChange={formik.handleChange}
                    name="email"
                    className="w-full p-2 border-2 border-black text-[#ccc] outline-none text-[16px]"
                  />
                </div>
              </div>
              <div className="flex gap-x-2 mt-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Current Password</label>
                  <input
                    type="text"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    name="currentPassword"
                    className="w-full p-2 border-2 border-black text-[#ccc] outline-none text-[16px]"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">New Password</label>
                  <input
                    type="text"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    name="newPassword"
                    className="w-full p-2 border-2 border-black text-[#ccc] outline-none text-[16px]"
                  />
                </div>
              </div>
              <div
                className="w-full p-2 text-[#fff] bg-[#000] hover:text-[#000] cursor-pointer hover:bg-[#fff] duration-200 border-2 border-black flex justify-center mt-4"
                onClick={formik.handleSubmit}
              >
                Update
              </div>
            </div>
          )}
        </div>
      </div>
    </NewLayout>
  );
};

export default Profile;
