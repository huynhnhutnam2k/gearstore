import React from "react";
const Label = ({ htmlFor = "", children }) => {
  return (
    <label className="text-sm text-left text-black uppercase" htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
