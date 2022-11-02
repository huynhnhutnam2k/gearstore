import { yupResolver } from "@hookform/resolvers/yup";
import Field from "components/field/field";
import { GoogleIcon } from "components/icons";
import { Input } from "components/input";
import { Label } from "components/label";
import NewLayout from "components/layout/NewLayout";
import { login, loginAction } from "features/users/userSlice";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { JBLQuantum } from "../asset/image/image";
import * as yup from "yup";
import { Link } from "react-router-dom";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  // onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";
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
const Login = () => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { isMobile } = useSelector((state) => state.stateDevide);
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

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        // console.log(res);
        const user = {
          username: res.user.displayName,
          email: res.user.email,
          _id: res.user.uid,
          token: res.user.accessToken,
          avatar: res.user.photoURL,
          providerId: res.providerId,
        };
        dispatch(login(user));
      })
      .catch((err) => console.log(err));
  };
  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        const user = {
          username: res.user.displayName,
          email: res.user.email,
          _id: res.user.uid,
          token: res.user.accessToken,
          avatar: res.user.photoURL,
          providerId: res.providerId,
        };
        dispatch(login(user));
      })
      .catch((err) => console.log(err));
  };
  return (
    <NewLayout>
      <div className="container">
        <div className="flex gap-x-2">
          <div className={`w-5/12 p-5 ${isMobile ? "hidden" : ""}`}>
            <img src={JBLQuantum} alt="" className="max-w-full" />
          </div>
          <div className={`${isMobile ? "w-full" : "w-7/12"} py-3 px-32 mt-5`}>
            <form action="w-full" onSubmit={handleSubmit(handleLogin)}>
              <div className="text-2xl font-bold text-center uppercase my-2">
                Đăng nhập
              </div>
              <div
                className="my-2 w-full px-4 py-2 h-12 items-center outline-none border-2 border-[#ccc] rounded cursor-pointer flex justify-center gap-x-2"
                onClick={signInWithGoogle}
              >
                <GoogleIcon className="w-10 h-10"></GoogleIcon>
                <div className="">Đăng nhập với google</div>
              </div>
              <div
                className="my-2 w-full px-4 py-2 h-12 items-center outline-none border-2 border-[#ccc] rounded cursor-pointer flex justify-center gap-x-2"
                onClick={signInWithFacebook}
              >
                <div className="w-10 h-10 text-blue-500 text-[40px]">
                  <ion-icon name="logo-facebook"></ion-icon>
                </div>
                <div className="">Đăng nhập với facebook</div>
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
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  name="password"
                  placeholder="Enter your password"
                  control={control}
                ></Input>
              </Field>
              <div className="flex flex-col mb-2">
                <Link
                  to="/register"
                  className=" inline-block uppercase hover:text-red-800"
                >
                  Bạn chưa có tài khoản?
                </Link>
                <Link
                  to="/forgot-password"
                  className="inline-block uppercase hover:text-red-800"
                >
                  Quên mật khẩu
                </Link>
              </div>
              <button
                type="submit"
                className="w-full uppercase p-2 flex justify-center items-center border-2 border-black bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] duration-200"
              >
                Đăng nhập{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default Login;
