import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/button";
import Field from "components/field/field";
import { GoogleIcon } from "components/icons";
import { Input } from "components/input";
import { Label } from "components/label";
import { loginAction } from "features/users/userSlice";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Invalid email"
    )
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be less than 20 characters long"),
});

const LoginStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 560px;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  ${"" /* height: 80vh; */}
  border-radius: 20px;
  margin-top: 50px;
  .login-top {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .login-google {
    display: flex;
    gap: 0 20px;
    height: 50px;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    width: 100%;
    border-radius: 20px;
    margin: 20px 0;
  }
  .login-google-icon {
    width: 40px;
    height: 40px;
  }
`;
const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Login page";
  }, []);
  const handleLogin = async (values) => {
    const user = {
      email: values.email,
      password: values.password,
    };
    dispatch(loginAction(user));
  };
  return (
    <LoginStyled>
      <div className="login-top">
        <div className="login-title">Welcome back</div>
        <div className="login-redirect">
          Don't have an account ?{" "}
          <NavLink to="/register" className="login-link">
            Sign up
          </NavLink>
        </div>
        <div className="login-google">
          <GoogleIcon className="login-google-icon"></GoogleIcon>
          <p>Sign in with google</p>
        </div>
      </div>
      <form
        action=""
        className="login-form"
        onSubmit={handleSubmit(handleLogin)}
      >
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            placeholder="Enter your email"
            control={control}
            errors={errors?.email?.message}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            placeholder="Enter your password"
            control={control}
            errors={errors?.password?.message}
          ></Input>
        </Field>
        <Button>Login</Button>
      </form>
    </LoginStyled>
  );
};

export default Login;
