/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./topnav.scss";
import UserInfo from "../user-info/UserInfo";
import { useAuthStore } from "../../store/auth-store";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const openSidebar = () => {
    document.body.classList.add("sidebar-open");
  };
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="topnav">
      <UserInfo user={userInfo} />
      <div className="sidebar-toggle" onClick={openSidebar}>
        <i className="bx bx-menu-alt-right"></i>
      </div>
    </div>
  );
};

export default TopNav;
