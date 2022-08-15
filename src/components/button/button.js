import { Loading } from "components/loading";
import React from "react";
const Button = ({
  type,
  onClick = () => {},
  kind = "primary",
  children,
  ...props
}) => {
  const { isloading } = props;
  const child = !!isloading ? <Loading></Loading> : children;
  return (
    <button
      className={` p-3 w-full rounded-md  ${
        kind === "secondary"
          ? "bg-white w-[200px] duration-200 text-black hover:bg-black hover:text-white"
          : "bg-gradient-to-br from-[#1DC071] to-[#A4D96C] text-white"
      }`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {child}
    </button>
  );
};

export default Button;
