import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GoogleIcon } from "components/icons";
import Field from "components/field/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NewLayout from "components/layout/NewLayout";
import { JBLQuantum } from "asset/image/image";

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
  const { handleSubmit, control } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  return (
    <NewLayout>
      <div className="container">
        <div className="flex gap-x-2">
          <div className="w-7/12 py-3 px-32 ">
            <form action="w-full" onSubmit={handleSubmit(register)}>
              <div className="text-2xl font-bold text-center uppercase my-2">
                Register
              </div>
              <div className="my-2 w-full px-4 py-2 h-12 items-center outline-none border-2 border-[#ccc] rounded cursor-pointer flex justify-center gap-x-2">
                <GoogleIcon className="w-10 h-10"></GoogleIcon>
                <div className="">Sign up with google</div>
              </div>
              <div className="my-2 w-full px-4 py-2 h-12 items-center outline-none border-2 border-[#ccc] rounded cursor-pointer flex justify-center gap-x-2">
                <div className="w-10 h-10 text-blue-500 text-[40px]">
                  <ion-icon name="logo-facebook"></ion-icon>
                </div>
                <div className="">Sign up with facebook</div>
              </div>
              <Field>
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  placeholder="Enter your email"
                  control={control}
                ></Input>
              </Field>
              <Field>
                <Label htmlFor="username">username</Label>
                <Input
                  name="username"
                  placeholder="Enter your username"
                  control={control}
                ></Input>
              </Field>
              <Field>
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  placeholder="Enter your password"
                  control={control}
                ></Input>
              </Field>
              <Link
                to="/login"
                className="mb-2 inline-block uppercase hover:text-red-800"
              >
                You're have account?
              </Link>
              <button
                type="submit"
                className="w-full uppercase p-2 flex justify-center items-center border-2 border-black bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] duration-200"
              >
                Login{" "}
              </button>
            </form>
          </div>
          <div className="w-5/12 p-5">
            <img src={JBLQuantum} alt="" className="max-w-full" />
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default Register;
