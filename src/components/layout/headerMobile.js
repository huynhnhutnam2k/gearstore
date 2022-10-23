import { setIsCheckedMenu } from "app/stateDevide";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const HeaderMobile = () => {
  const dispatch = useDispatch();
  const { isCheckedMenu } = useSelector((state) => state.stateDevide);
  return (
    <div className="flex justify-between h-[60px] items-center">
      <div className="w-10 h-10 flex  items-center text-xl font-bold uppercase">
        ATShop
      </div>
      <label
        htmlFor="checkbox"
        className={`hamberger ${isCheckedMenu ? "fixed" : "relative"}`}
      >
        <input
          type="checkbox"
          id="checkbox"
          defaultChecked={false}
          onChange={() => dispatch(setIsCheckedMenu(!isCheckedMenu))}
        />
        <span
          className={`line line-top ${isCheckedMenu ? "bg-slate-300" : ""}`}
        ></span>
        <span className="line line-middle"></span>
        <span
          className={`line line-bottom ${isCheckedMenu ? "bg-slate-300" : ""}`}
        ></span>
      </label>
    </div>
  );
};

export default HeaderMobile;
