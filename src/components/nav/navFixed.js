import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllCategories } from "app/categorySlice";
import { setIsCheckedMenu } from "app/stateDevide";
import { logout } from "features/users/userSlice";
import { searchProduct } from "app/productSlice";
const nav = [
  {
    name: "Contacts",
    path: "/contacts",
  },
  {
    name: "About",
    path: "/about",
  },
];
const NavFixed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { isCheckedMenu } = useSelector((state) => state.stateDevide);
  const { categories } = useSelector((state) => state.category);
  const { userInfo } = useSelector((state) => state.user);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    dispatch(getAllCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSearch = () => {
    dispatch(searchProduct(keyword));
    dispatch(setIsCheckedMenu(false));
    window.scrollTo(0, 0);
    navigate(`/search/${keyword}`);
  };
  return (
    <div
      className={`fixed top-0 ${
        isCheckedMenu ? "left-0" : "-left-full"
      } right-0 bottom-0 w-full z-40 text-black bg-white duration-200 text-lg`}
    >
      <div className="text-center uppercase font-bold pt-3 text-xl">AtShop</div>
      <div className="w-4/5 mx-auto bg-slate-300 h-10 relative">
        <input
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full h-full rounded border-2 border-[#ccc] bg-slate-200 outline-none px-2 text-sm"
        />
        <div
          className="absolute top-1/2 right-2 -translate-y-1/2 w-10 h-10 flex justify-center items-center cursor-pointer"
          onClick={handleSearch}
        >
          <ion-icon name="search"></ion-icon>
        </div>
      </div>
      <div className="flex justify-center items-center h-10 text-xl">
        <div className="w-10 h-10 flex justify-center items-center ">
          {userInfo ? (
            <NavLink
              to="/profile"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo(0, 0);
                dispatch(setIsCheckedMenu(false));
                navigate("/profile");
              }}
            >
              <ion-icon name="person-circle-outline"></ion-icon>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo(0, 0);
                dispatch(setIsCheckedMenu(false));
                navigate("/login");
              }}
            >
              <ion-icon name="person-circle-outline"></ion-icon>
            </NavLink>
          )}
        </div>
        <div className="w-10 h-10 flex justify-center items-center ">
          <NavLink
            to="/cart"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo(0, 0);
              dispatch(setIsCheckedMenu(false));
              navigate("/cart");
            }}
          >
            <ion-icon name="bag-outline"></ion-icon>
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col px-2">
        <NavLink
          to="/"
          className="w-full border-b-2 border-b-transparent duration-150 hover:border-b-red-300"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
            dispatch(setIsCheckedMenu(false));
            navigate("/");
          }}
        >
          Home
        </NavLink>
        <div className="flex flex-col">
          <div className="flex justify-between h-10 items-center border-b-2 border-b-transparent duration-150 hover:border-b-red-300">
            <NavLink to="/products">Shop</NavLink>
            {!show ? (
              <div className="" onClick={() => setShow(!show)}>
                <ion-icon name="chevron-down-outline"></ion-icon>
              </div>
            ) : (
              <div className="" onClick={() => setShow(!show)}>
                <ion-icon name="chevron-up-outline"></ion-icon>
              </div>
            )}
          </div>
          <ul
            className={`${
              !show ? "h-0 leading-[0] p-0" : "h-auto leading-5 py-3"
            } duration-200 overflow-hidden bg-slate-300 flex flex-col gap-y-2 px-2 rounded text-white`}
          >
            {categories?.map((item) => (
              <li className="w-full border-b-2 border-b-transparent duration-150 hover:border-b-red-300">
                <NavLink
                  to="/products "
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo(0, 0);
                    dispatch(setIsCheckedMenu(false));
                    navigate("/products");
                  }}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          {nav.map((item) => (
            <li className="list-none w-full border-b-2 border-b-transparent duration-150 hover:border-b-red-300">
              <NavLink
                to={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo(0, 0);
                  dispatch(setIsCheckedMenu(false));
                  navigate(item.path);
                }}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </div>
        {userInfo && (
          <div className="cursor-pointer" onClick={() => dispatch(logout())}>
            Logout
          </div>
        )}
      </div>
    </div>
  );
};

export default NavFixed;
