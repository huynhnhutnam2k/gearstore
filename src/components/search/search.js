import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { newKeyword } from "./searchSlice";
const Search = ({ name, placeholder, ...children }) => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    await dispatch(newKeyword(keyword));
  };
  return (
    <div className="relative w-full max-w-[70%] h-[50px] px-2">
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        {...children}
        className="w-full h-full rounded-lg border border-[#ccc] outline-none px-3"
      />
      <span
        className="w-10 h-10 flex justify-center items-center hover:bg-slate-200 duration-150 cursor-pointer rounded-full absolute top-1/2 -translate-y-1/2 right-2"
        onClick={handleSubmit}
      >
        <ion-icon name="search"></ion-icon>
      </span>
    </div>
  );
};

export default Search;
