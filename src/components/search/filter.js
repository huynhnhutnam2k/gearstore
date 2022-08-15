import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { newSort } from "./searchSlice";

const Filter = () => {
  const [key, setKey] = React.useState(undefined);
  const { isMobile } = useSelector((state) => state.stateDevide);
  const dispatch = useDispatch();
  return (
    <select
      name=""
      id=""
      value={key}
      onChange={(e) => {
        setKey(e.target.value);
        dispatch(newSort(e.target.value));
      }}
      className={`w-full ${
        !isMobile ? "max-w-[20%]" : "max-w-[30%]"
      } h-[50px] border border-[#ccc] rounded-md outline-none mr-2`}
    >
      <option value="dsad">Feature</option>
      <option value="aa">das</option>
      <option value="xx">das</option>
    </select>
  );
};

export default Filter;
