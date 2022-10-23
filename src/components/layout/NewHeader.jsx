import { searchProduct } from "app/productSlice";
import { logout } from "features/users/userSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
    name: "Contact",
    path: "/contact",
  },
];
const miniNav = [
  {
    name: "Profile",
    path: "/profile",
  },
  {
    name: "Your order",
    path: "/order",
  },
];
const NewHeader = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearch = () => {
    dispatch(searchProduct(keyword));
    navigate(`/search/${keyword}`);
  };
  return (
    <>
      <div className="w-full bg-slate-300">
        <div className="container flex justify-between h-[30px] items-center">
          <div className="">+840123456789 | atshop@mail.com</div>
          <div className="">Freeship voi don tren 300k</div>
        </div>
      </div>
      <div className="container flex justify-between h-[100px] items-center">
        <Link to="/" className="font-bold text-3xl capitalize">
          ATShop
        </Link>
        <div className="w-[600px] h-10 relative">
          <input
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full h-full px-2 py-1 bg-slate-300 outline-none "
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 right-2 text-xl flex justify-center items-center cursor-pointer"
            onClick={handleSearch}
          >
            <ion-icon name="search"></ion-icon>
          </div>
        </div>
        <div className="flex gap-x-4 text-xl cursor-pointer items-center">
          {userInfo === null ? (
            <Link to="/login" className="">
              <ion-icon name="person-outline"></ion-icon>
            </Link>
          ) : (
            <div className="hover-name">
              {userInfo?.username}
              <ul className="hover-name-child">
                {!userInfo?.providerId ? (
                  miniNav.map((item) => (
                    <li className="" onClick={(e) => e.preventDefault()}>
                      <Link to={item.path} className="hover:text-red-300">
                        {" "}
                        {item.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li
                    className="hover:text-red-300"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Link to="/order">Your order</Link>
                  </li>
                )}
                <li
                  className="hover:text-red-300"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}

          <Link to="/cart" className="">
            <ion-icon name="cart-outline"></ion-icon>
          </Link>
        </div>
      </div>
      <div className="w-full bg-slate-300 flex justify-center gap-x-8 h-[40px] items-center">
        {nav.map((item) => (
          <Link
            to={item.path}
            className="uppercase text-lg  text-black font-bold relative before:content-[''] before:absolute before:-bottom-[6px]  before:w-0 before:duration-200 before:left-1/2 before:-translate-x-1/2 hover:before:w-full before:h-1 before:bg-red-800 "
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default NewHeader;
