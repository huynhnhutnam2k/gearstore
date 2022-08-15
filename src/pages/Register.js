import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { GoogleIcon } from "components/icons";
import Field from "components/field/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "components/button";
const RegisterStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${"" /* justify-content: center; */}
  height: 80vh;
  width: 100%;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  .register-head {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .register-link {
    ${"" /* text-decoration: none; */}
    color: #20e3b2;
  }
  .register-google {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    gap: 0 10px;
    border-radius: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    width: 100%;
    cursor: pointer;
  }
  .register-google-icon {
    width: 40px;
    height: 40px;
    background: transparent;
  }
  .register-form {
    width: 100%;
    margin-top: 20px;
  }
`;
const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      "Email is invalid"
    ),
  password: yup
    .string()
    .required("Password is required")
    .matches(/^[a-zA-Z0-9]{6,}$/, "Password must be at least 6 characters"),
  username: yup
    .string()
    .required("Username is required")
    .max(20, "Username must be less than 20 characters")
    .min(3, "Username must be at least 3 characters"),
});
const Register = () => {
  useEffect(() => {
    document.title = "Register page";
  }, []);
  const register = (data) => {
    console.log(data);
  };
  const {
    handleSubmit,
    control,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  return (
    <RegisterStyled>
      <div className="register-head">
        <h2>Register</h2>
        <div className="register-redirect">
          Already have an account?{" "}
          <NavLink to="/login" className="register-link">
            Sign in
          </NavLink>{" "}
        </div>
        <div className="register-google">
          <GoogleIcon className="register-google-icon"></GoogleIcon>
          <p>Sign up with google</p>
        </div>
      </div>
      <form
        action=""
        className="register-form"
        onSubmit={handleSubmit(register)}
      >
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            name="email"
            touch={touchedFields.email}
            errors={errors?.email?.message}
            placeholder="Enter your email"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            name="username"
            touch={touchedFields.username}
            errors={errors?.username?.message}
            placeholder="Enter your username"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type="text"
            name="password"
            touch={touchedFields.password}
            errors={errors?.password?.message}
            placeholder="Enter your password"
            control={control}
          ></Input>
        </Field>
        <Button>Register</Button>
      </form>
    </RegisterStyled>
  );
};

export default Register;
