import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Detail from "pages/Detail";
import ErrorPage from "pages/ErrorPage";
import Product from "pages/Product";
import Cart from "pages/Cart";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "app/stateDevide";
import { PHONE_BREAKPOINT, TABLET_BREAKPOINT } from "constant/breakpoint";
import ThankYou from "pages/ThankYou";
import Chat from "pages/Chat";
function App() {
  const [width, setWidth] = useState(undefined);
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.stateDevide.isMobile);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    // console.log(width);
    if (width >= PHONE_BREAKPOINT) {
      dispatch(setIsMobile(false));
    } else {
      dispatch(setIsMobile(true));
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);
  // const { userInfo } = useSelector((state) => state.user);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!userInfo) {
  //     navigate("/login");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);

  return (
    <div
      className={`w-full overflow-x-hidden ${
        isMobile
          ? `max-w-[${PHONE_BREAKPOINT}]`
          : `max-w-[${TABLET_BREAKPOINT}]`
      }`}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/thanks" element={<ThankYou />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
