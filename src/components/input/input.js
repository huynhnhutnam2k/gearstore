import React from "react";
import { useController } from "react-hook-form";

const Input = ({
  type = "text",
  control,
  errors = null,
  touch,
  children,
  ...props
}) => {
  // console.log(props.touch);
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    // <InputStyled>
    <input
      type={type}
      {...field}
      {...children}
      {...props}
      className="w-full p-2 border-2 border-black rounded outline-none"
    />
    // {errors && <div className="input-error">{errors}</div>}
    // </InputStyled>
  );
};

// Input.PropsType = {
//   type: PropsType.string,
//   name: PropsType.isRequired,
//   control: PropsType.object,
//   errors: PropsType.string,
//   children: PropsType.any,
// };
export default Input;
