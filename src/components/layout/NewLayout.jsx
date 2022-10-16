// import { NavFixed } from "components/nav";
import React from "react";
// import { useSelector } from "react-redux";
import Footer from "./Footer";
// import HeaderMobile from "./headerMobile";
import NewHeader from "./NewHeader";

const NewLayout = ({ children }) => {
  // const { isMobile, isCheckedMenu } = useSelector((state) => state.stateDevide);
  return (
    <>
      {/* {!isMobile ? <NewHeader></NewHeader> : <HeaderMobile></HeaderMobile>} */}
      <NewHeader></NewHeader>
      {children}
      <Footer></Footer>
      {/* {isMobile && isCheckedMenu ? <NavFixed></NavFixed> : null} */}
    </>
  );
};

export default NewLayout;
