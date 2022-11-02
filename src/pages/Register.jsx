import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { GoogleIcon } from "components/icons";
import Field from "components/field/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NewLayout from "components/layout/NewLayout";
import { JBLQuantum } from "asset/image/image";
import { useDispatch, useSelector } from "react-redux";
import { register } from "features/users/userSlice";
import { useRef } from "react";
import { toast } from "react-toastify";
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
    document.title = "Đăng ký";
  }, []);
  const dispatch = useDispatch();
  const handleRegister = (data) => {
    dispatch(register(data));
  };
  const { handleSubmit, control } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { isMobile } = useSelector((state) => state.stateDevide);
  const { msg, isLoading, isSuccess, isError } = useSelector(
    (state) => state.user
  );
  const toastId = useRef(null);
  useEffect(() => {
    if (!isLoading && isError) {
      toast.dismiss(toastId.current);
      toast.error("Đăng ký thất bại", { containerId: "A" });
    } else if (!isLoading && isSuccess) {
      toast.dismiss(toastId.current);
      toast.success("Đăng ký thành công", { containerId: "A" });
    } else if (isLoading) {
      toastId.current = toast.info("Đang xử lý...", { containerId: "A" });
    }
  }, [isLoading, msg, isError, isSuccess]);
  return (
    <NewLayout>
      <div className="container">
        <div className="flex gap-x-2">
          <div className={`${isMobile ? "w-full" : "w-7/12"} py-20 px-32`}>
            <form action="w-full" onSubmit={handleSubmit(handleRegister)}>
              <div className="text-2xl font-bold text-center uppercase my-2">
                Đăng ký
              </div>
              {/* <div className="my-2 w-full px-4 py-2 h-12 items-center outline-none border-2 border-[#ccc] rounded cursor-pointer flex justify-center gap-x-2">
                <GoogleIcon className="w-10 h-10"></GoogleIcon>
                <div className="">Sign up with google</div>
              </div>
              <div className="my-2 w-full px-4 py-2 h-12 items-center outline-none border-2 border-[#ccc] rounded cursor-pointer flex justify-center gap-x-2">
                <div className="w-10 h-10 text-blue-500 text-[40px]">
                  <ion-icon name="logo-facebook"></ion-icon>
                </div>
                <div className="">Sign up with facebook</div>
              </div> */}
              <Field>
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  placeholder="Nhập địa chỉ email"
                  control={control}
                ></Input>
              </Field>
              <Field>
                <Label htmlFor="username">Tên người dùng</Label>
                <Input
                  name="username"
                  placeholder="Nhập tên người dùng"
                  control={control}
                ></Input>
              </Field>
              <Field>
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  name="password"
                  placeholder="Nhập mật khẩu"
                  control={control}
                ></Input>
              </Field>
              <Link
                to="/login"
                className="mb-2 inline-block uppercase hover:text-red-800"
              >
                Bạn đã có tài khoản?
              </Link>
              <button
                type="submit"
                className="w-full uppercase p-2 flex justify-center items-center border-2 border-black bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] duration-200"
              >
                Đăng ký{" "}
              </button>
            </form>
          </div>
          <div className={` ${isMobile ? "w-0" : "w-5/12 p-5"}`}>
            <img src={JBLQuantum} alt="" className="max-w-full" />
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default Register;
