import { setIsCheckedMenu } from "app/stateDevide";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const nav = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Products",
    path: "/products",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Cart",
    path: "/cart",
  },
  {
    name: "Wishlist",
    path: "/wishlist",
  },
];
const NavFixed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-rgba text-white p-10 flex flex-col items-center text-[25px] gap-y-5">
      {nav.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
            dispatch(setIsCheckedMenu(false));
            navigate(item.path);
          }}
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default NavFixed;
