import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
// import PropsType from "props-type";
const InputStyled = styled.div`
  display: flex;
  flex-direction: column;
  .input {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    font-family: 'Josefin Sans', sans-serif;
    border: ${(props) =>
      props.errors !== null ? "1px solid #ccc;" : "1px solid #F62682;"}
    padding: 0 10px;
    outline: none;
    ::-webkit-input-placeholder {
      /* Edge */
      font-weight: bold;
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      font-weight: bold;
    }

    ::placeholder {
      font-weight: bold;
    }
  }
  .input-error {
    color: red;
    font-size: 0.8rem;
    margin-top: 5px;
    text-transform: capitalize;
    
  }

`;
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
    <InputStyled>
      <input
        type={type}
        {...field}
        {...children}
        {...props}
        className="input"
      />
      {errors && <div className="input-error">{errors}</div>}
    </InputStyled>
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
