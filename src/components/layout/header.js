import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
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
];
const Header = () => {
  const [height, setHeight] = React.useState(null);

  const headerRef = React.useRef(null);
  React.useEffect(() => {
    const handleScroll = () => {
      setHeight(window.scrollY);
    };

    document.addEventListener("scroll", handleScroll);
    if (height > 80) {
      headerRef.current.classList.add(
        "fixed",
        "top-0",
        "left-0",
        "right-0",
        "z-50",
        "shadow-md",
        "bg-white"
      );
    } else {
      headerRef.current.classList.remove(
        "fixed",
        "top-0",
        "left-0",
        "right-0",
        "z-50",
        "shadow-md",
        "bg-white"
      );
    }
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [height]);
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div className="w-full h-[80px] shadow-sm " ref={headerRef}>
      <div className="flex w-full max-w-[1170px] mx-auto h-[80px] items-center justify-between ">
        <img src="/logo.png" alt="" className="max-h-[60px]" />
        <div className="flex items-center gap-x-5">
          {nav.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="hover:text-green-400 duration-150 relative before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:content-[''] before:bg-green-400 before:w-0 before:h-[2px] before:duration-200 hover:before:w-full"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="flex gap-3 cursor-pointer">
          <NavLink to="/cart">
            <ion-icon name="cart-outline"></ion-icon>
          </NavLink>
          {userInfo ? (
            <div className="profile">
              <ion-icon name="person-outline"></ion-icon>
              <ul className="profile-ul">
                <li className="hover:bg-green-300 hover:text-white">
                  <Link to="/" className="hover:text-white">
                    Profile
                  </Link>
                </li>
                <li className="hover:bg-green-300 hover:text-white">
                  <Link to="/" className="hover:text-white">
                    Your order
                  </Link>
                </li>
                <li className="hover:bg-green-300 hover:text-white">Log out</li>
              </ul>
            </div>
          ) : (
            <NavLink to="/login">
              <ion-icon name="person-outline"></ion-icon>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
