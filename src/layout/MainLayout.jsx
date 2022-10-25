/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./main-layout.scss";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import { ToastContainer } from "react-toastify";
import toastOption from "../constants/toastOption";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../store/auth-store";
const MainLayout = () => {
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Sidebar />
      <ToastContainer containerId="A" {...toastOption}></ToastContainer>
      <div className="main">
        <div className="main__content">
          <TopNav />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
