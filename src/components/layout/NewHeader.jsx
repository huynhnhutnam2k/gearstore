import React from "react";
import { Link } from "react-router-dom";
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
const NewHeader = () => {
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
            className="w-full h-full px-2 py-1 bg-slate-300 outline-none "
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-2 text-xl flex justify-center items-center cursor-pointer">
            <ion-icon name="search"></ion-icon>
          </div>
        </div>
        <div className="flex gap-x-4 text-xl cursor-pointer ">
          <Link to="/login" className="">
            <ion-icon name="person-outline"></ion-icon>
          </Link>
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
