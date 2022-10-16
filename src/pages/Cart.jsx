import { JBLJR0310BT1 } from "asset/image/image";
import NewLayout from "components/layout/NewLayout";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import data from "constant/data.json";
import { useState } from "react";
import { useEffect } from "react";
const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const [districts, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  // console.log(data);
  console.log(data);
  useEffect(() => {
    console.log(districts);
  }, [districts]);
  return (
    // <Layout>
    //   <h2 className="text-lg text-center my-2">Your Cart</h2>
    //   {cart?.length > 0 ? (
    //     <div className="w-full max-w-[1200px] mx-auto flex gap-x-5 mt-5">
    //       <CartList></CartList>
    //       <CartTotal></CartTotal>
    //     </div>
    //   ) : (
    //     <h2 className="text-[30px] text-green-400 text-center">
    //       Your cart is empty,{" "}
    //       <Link to="/" className="underline">
    //         {" "}
    //         click here
    //       </Link>{" "}
    //       to buy
    //     </h2>
    //   )}
    // </Layout>
    // <>
    //   {cart && cart.length !== 0 ? (
    <NewLayout>
      <div className="container ">
        <div className="flex p-5 gap-x-3 gap-y-3">
          <Link to="/" className="hover:text-red-800 uppercase duration-150">
            Home
          </Link>
          <div className="">
            <ion-icon name="play-forward-outline"></ion-icon>
          </div>
          <Link
            to="/cart"
            className=" hover:text-red-800 uppercase duration-150"
          >
            Cart
          </Link>
        </div>
        <div className="my-5">
          <div className=" h-[200px] px-32 py-6 ">
            <div className="flex justify-between h-full border-b-2 border-b-slate-300">
              <div className="flex gap-x-5">
                <img src={JBLJR0310BT1} alt="" className="h-full " />
                <div className="flex flex-col justify-center gap-y-2">
                  <div className="">JBLJR0310BT1</div>
                  <div className="">Lorem ipsum dolor sit amet.</div>
                  <div className="flex h-8 items-center gap-x-2">
                    <div className="w-8 h-8 flex justify-center items-center border-2 border-black text-lg">
                      -
                    </div>
                    <input
                      type="text"
                      className="h-full p-2 border-2 border-black text-center w-[50px] outline-none"
                      value={2}
                    />
                    <div className="w-8 h-8 flex justify-center items-center border-2 border-black text-lg">
                      +
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full flex items-center gap-x-2 ">
                <div className="">9.99$</div>
                <div className="flex justify-center items-center w-10 h-10 text-white rounded-full bg-slate-400 cursor-pointer">
                  x
                </div>
              </div>
            </div>
          </div>
          <div className="py-4 px-32 flex justify-between h-10 items-center">
            <div className="text-xl">Total</div>
            <div className="">9.99$</div>
          </div>
        </div>

        <div className="px-32 flex gap-x-2 justify-between mb-5">
          <div className="w-1/2 ">
            <div className="text-center uppercase text-lg bg-slate-300 p-2 mb-2">
              thông tin cá nhân
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="">Name</label>
              <input
                type="text"
                className="w-full p-2 border-2 border-black outline-none"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="w-full p-2 border-2 border-black outline-none"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="">Number phone</label>
              <input
                type="text"
                className="w-full p-2 border-2 border-black outline-none"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="">Address</label>
              <input
                type="text"
                className="w-full p-2 border-2 border-black outline-none"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="text-center uppercase text-lg bg-slate-300 p-2 mb-2">
              thông tin vận chuyển
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="">City</label>
              <select
                name=""
                id=""
                onChange={(e) => {
                  const city = data.filter(
                    (item) => item.Name === e.target.value
                  );
                  setDistrict(city[0].Districts);
                }}
                className="w-full p-2 border-2 border-black outline-none h-[41px]"
              >
                {data.map((item) => (
                  <option value={item.Name} className="w-full h-full">
                    {item.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="">Districts</label>
              <select
                name=""
                id=""
                onChange={(e) => {
                  const district = districts.filter(
                    (item) => item.Name === e.target.value
                  );
                  setWard(district[0].Wards);
                }}
                className="w-full p-2 border-2 border-black outline-none h-[41px]"
              >
                {districts.map((item) => (
                  <option value={item.Name} className="w-full h-full">
                    {item.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="">Ward</label>
              <select
                name=""
                id=""
                onChange={(e) => {
                  const city = data.filter(
                    (item) => item.Name === e.target.value
                  );
                  setDistrict(city[0].Districts);
                }}
                className="w-full p-2 border-2 border-black outline-none h-[41px]"
              >
                {ward.map((item) => (
                  <option value={item.Name} className="w-full h-full">
                    {item.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="px-32 flex justify-end">
          <Link
            to="/checkout"
            className="bg-[#000] text-[#fff] p-2 text-sm border-2 border-black hover:bg-[#fff] hover:text-[#000]"
          >
            Checkout
          </Link>
        </div>
      </div>
    </NewLayout>
    // ) : (
    //   <NewLayout>
    //     <div className="container p-5">
    //       <img
    //         src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
    //         alt=""
    //         className="w-full object-cover max-h-[600px]"
    //       />
    //       <Link
    //         to="/"
    //         className="text-xl flex justify-center uppercase underline hover:text-red-800"
    //       >
    //         Return home to buy item{" "}
    //       </Link>
    //     </div>
    //   </NewLayout>
    // )}
    // </>
  );
};

export default Cart;
