import React from "react";
import { useController } from "react-hook-form";

const Select = ({ control, option, name }) => {
  const { field } = useController({ name, control });
  return (
    <div>
      <select name="" id="" className="w-full max-w-[200px]" {...field}>
        <option value="">{name}</option>
        {option.map((item, index) => (
          <option key={index} value={item.value}>
            {item.Name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
