import { NavFixed } from "components/nav";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Header from "./header";
import HeaderMobile from "./headerMobile";

const Layout = ({ children }) => {
  const { isMobile, isCheckedMenu } = useSelector((state) => state.stateDevide);
  return (
    <Fragment>
      {!isMobile ? <Header></Header> : <HeaderMobile></HeaderMobile>}
      {children}
      {isMobile && isCheckedMenu ? <NavFixed></NavFixed> : null}
    </Fragment>
  );
};

export default Layout;
