import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";
import "./login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, userInfo } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo?._id) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <div className="bg-login">
      <div className="box">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>
      <div className="mx-auto w-[400px]  p-4 rounded bg-white mt-32">
        <div className="text-center uppercase">Login</div>
        <form
          action=""
          className="flex gap-y-2 w-full flex-col"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-y-1 w-full">
            <label htmlFor="">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border-2 border-black outline-0 rounded"
            />
          </div>
          <div className="flex flex-col gap-y-1 w-full">
            <label htmlFor="">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border-2 border-black outline-0 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-[#0e6cc4] w-full p-2 rounded text-center text-white cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
