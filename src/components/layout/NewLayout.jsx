import React from "react";
import Footer from "./Footer";
import NewHeader from "./NewHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import HeaderMobile from "./headerMobile";
import { NavFixed } from "components/nav";
export const toastOption = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};
const NewLayout = ({ children }) => {
  const { isMobile } = useSelector((state) => state.stateDevide);

  return (
    <>
      {isMobile ? <HeaderMobile></HeaderMobile> : <NewHeader></NewHeader>}

      <ToastContainer
        enableMultiContainer
        containerId={"A"}
        {...toastOption}
      ></ToastContainer>
      {children}
      <Footer></Footer>
      <NavFixed></NavFixed>
      {/* {isMobile && isCheckedMenu ? <NavFixed></NavFixed> : null} */}
    </>
  );
};

export default NewLayout;
