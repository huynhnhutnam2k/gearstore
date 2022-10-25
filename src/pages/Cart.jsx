import NewLayout from "components/layout/NewLayout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import data from "constant/data.json";
import { useState } from "react";
import {
  removeAllOrderItem,
  removeOrderItem,
  resetState,
  updateOrderItem,
} from "app/orderSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { addNewOrder } from "../app/orderSlice";
import * as yup from "yup";
import { emailRegExp, phoneRegExp } from "utils/valid";
const Cart = () => {
  const { orderItem } = useSelector((state) => state.order);
  const [city, setCity] = useState(null);
  const [districts, setDistrict] = useState([]);
  const [districtName, setDistrictName] = useState(null);
  const [ward, setWard] = useState([]);
  const [wardName, setWardName] = useState(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { isLoading, addSuccess, isError, msg } = useSelector(
    (state) => state.order
  );
  const { isMobile } = useSelector((state) => state.stateDevide);
  const formik = useFormik({
    initialValues: {
      name: userInfo?.username,
      email: userInfo?.email,
      phone: "",
      address: "",
    },
    validationSchema: yup.object().shape({
      phone: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Phone is required"),
      name: yup.string().required("Name is required"),
      email: yup
        .string()
        .matches(emailRegExp, "Email is not valid")
        .required("Email is required"),
      address: yup
        .string()
        .required("Address is required")
        .min(6, "Address is too short"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      const order = {
        user: {
          name: values.name,
          phone: values.phone,
          email: values.email,
        },
        orderItems: orderItem,
        shippingAddress: {
          city: city,
          address: values.address,
          districts: districtName,
          ward: wardName,
        },
        totalPrice: +orderItem.reduce((a, b) => a + +b.price * +b.qty, 0),
      };
      dispatch(
        addNewOrder({
          order,
          token: userInfo?.token,
          providerId: userInfo?.providerId,
        })
      );
    },
  });
  const toastId = React.useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && isError) {
      toast.dismiss(toastId.current);
      toast.error(msg, { containerId: "A" });
      dispatch(resetState());
    } else if (!isLoading && addSuccess) {
      toast.dismiss(toastId.current);
      toast.success("Order success", { containerId: "A" });
      setTimeout(() => {
        navigate("/thanks");
        dispatch(removeAllOrderItem());
        dispatch(resetState());
      }, 3000);
    } else if (isLoading) {
      toastId.current = toast.info("Please wait...", {
        containerId: "A",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, addSuccess, isError]);
  return (
    <>
      {orderItem?.length > 0 ? (
        <NewLayout>
          <div className={`container ${isMobile ? "min-w-full px-0" : ""}`}>
            <div className="flex p-5 gap-x-3 gap-y-3">
              <Link
                to="/"
                className="hover:text-red-800 uppercase duration-150"
              >
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
            <div className={`my-5 ${isMobile ? "w-full" : ""}`}>
              {orderItem?.length > 0 &&
                orderItem?.map((item) => (
                  <div
                    className={` h-[200px] ${
                      isMobile ? "px-4 py-2" : "px-32 py-6"
                    } `}
                  >
                    <div className="flex justify-between h-full border-b-2 border-b-slate-300">
                      <div className="flex gap-x-5">
                        <img src={item.image1} alt="" className="h-full " />
                        <div className="flex flex-col justify-center gap-y-2">
                          <div className="">{item.name}</div>
                          <div className="">Lorem ipsum dolor sit amet.</div>
                          <div className="flex h-8 items-center gap-x-2">
                            <div
                              className="w-8 h-8 flex justify-center items-center border-2 border-black text-lg cursor-pointer"
                              onClick={() => {
                                dispatch(
                                  updateOrderItem({
                                    ...item,
                                    qty:
                                      item.qty > 1 ? +item.qty - 1 : +item.qty,
                                  })
                                );
                              }}
                            >
                              -
                            </div>
                            <input
                              type="text"
                              className="h-full p-2 border-2 border-black text-center w-[50px] outline-none"
                              value={item.qty}
                            />
                            <div
                              className="w-8 h-8 flex justify-center items-center border-2 border-black text-lg cursor-pointer"
                              onClick={() => {
                                dispatch(
                                  updateOrderItem({
                                    ...item,
                                    qty: +item.qty + 1,
                                  })
                                );
                              }}
                            >
                              +
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="h-full flex items-center gap-x-2 ">
                        {item.salePercent === 0 ? (
                          <div className="">${item.price}</div>
                        ) : (
                          <div className="flex flex-col">
                            <div className="line-through text-red-400">
                              {item.price}
                            </div>
                            <div className="">
                              {+item.price -
                                (+item.price * item.salePercent) / 100}
                            </div>
                          </div>
                        )}

                        <div
                          className="flex justify-center items-center w-10 h-10 text-white rounded-full bg-slate-400 cursor-pointer"
                          onClick={() => {
                            dispatch(removeOrderItem(item.product));
                            toast.success("Remove successfully", {
                              containerId: "A",
                            });
                          }}
                        >
                          x
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              <div
                className={`${
                  isMobile ? "py-2 px-10" : "py-4 px-32"
                } flex justify-between h-10 items-center`}
              >
                <div className="text-xl">Total</div>
                <div className="">
                  $
                  {orderItem.reduce((a, b) => {
                    if (b.salePercent === 0) {
                      return a + +b.price * +b.qty;
                    } else {
                      return (
                        a + (+b.price - (b.price * b.salePercent) / 100) * b.qty
                      );
                    }
                  }, 0)}
                </div>
              </div>
            </div>
            {userInfo ? (
              <>
                <div
                  className={`${
                    isMobile ? "flex-col px-4" : "px-32"
                  } flex gap-x-2 justify-between mb-5`}
                >
                  <div className={`${isMobile ? "w-full" : "w-1/2"} `}>
                    <div className="text-center uppercase text-lg bg-slate-300 p-2 mb-2">
                      thông tin cá nhân
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <label htmlFor="">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border-2 border-black outline-none"
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="text-sm text-red-500 h-auto duration-200">
                          {formik.errors.name}
                        </div>
                      ) : (
                        <div className="h-5 "></div>
                      )}
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <label htmlFor="">Email</label>
                      <input
                        type="text"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border-2 border-black outline-none"
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-sm text-red-500">
                          {formik.errors.email}
                        </div>
                      ) : (
                        <div className="h-5"></div>
                      )}
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <label htmlFor="">Number phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border-2 border-black outline-none"
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-sm text-red-500">
                          {formik.errors.phone}
                        </div>
                      ) : (
                        <div className="h-5"></div>
                      )}
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <label htmlFor="">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border-2 border-black outline-none"
                      />
                      {formik.touched.address && formik.errors.address ? (
                        <div className="text-sm text-red-500">
                          {formik.errors.address}
                        </div>
                      ) : (
                        <div className="h-5"></div>
                      )}
                    </div>
                  </div>
                  <div className={`${isMobile ? "w-full" : "w-1/2"}`}>
                    <div className="text-center uppercase text-lg bg-slate-300 p-2 mb-2">
                      thông tin vận chuyển
                    </div>
                    <div className="flex flex-col gap-y-1 mb-4">
                      <label htmlFor="">City</label>
                      <select
                        // name="city"
                        // value={formik.values.city}
                        id=""
                        onChange={(e) => {
                          const city = data.filter(
                            (item) => item.Name === e.target.value
                          );
                          setCity(e.target.value);
                          setDistrict(city[0].Districts);
                        }}
                        className="w-full p-2 border-2 border-black outline-none h-[41px]"
                      >
                        <option value="">City</option>
                        {data.map((item) => (
                          <option value={item.Name} className="w-full h-full">
                            {item.Name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-y-1 mb-4">
                      <label htmlFor="">Districts</label>
                      <select
                        name=""
                        id=""
                        onChange={(e) => {
                          const district = districts.filter(
                            (item) => item.Name === e.target.value
                          );
                          setDistrictName(e.target.value);
                          setWard(district[0].Wards);
                        }}
                        className="w-full p-2 border-2 border-black outline-none h-[41px]"
                      >
                        <option value="">Districts</option>
                        {districts.map((item) => (
                          <option value={item.Name} className="w-full h-full">
                            {item.Name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-y-1 mb-4">
                      <label htmlFor="">Ward</label>
                      <select
                        name=""
                        id=""
                        onChange={(e) => {
                          // const city = data.filter(
                          //   (item) => item.Name === e.target.value
                          // );
                          setWardName(e.target.value);
                          // setDistrict(city[0].Districts);
                        }}
                        className="w-full p-2 border-2 border-black outline-none h-[41px]"
                      >
                        <option value="">Ward</option>
                        {ward.map((item) => (
                          <option value={item.Name} className="w-full h-full">
                            {item.Name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className={`${isMobile ? "px-4" : "px-32"} flex justify-end`}
                >
                  <div
                    className="cursor-pointer bg-[#000] text-[#fff] p-2 text-sm border-2 border-black hover:bg-[#fff] hover:text-[#000] duration-200"
                    onClick={formik.handleSubmit}
                  >
                    Checkout
                  </div>
                </div>{" "}
              </>
            ) : (
              <div className={`${isMobile ? "px-4" : ""}`}>
                <Link
                  to="/login"
                  className="text-2xl text-center block uppercase bg-[#000] p-2 text-[#fff] hover:text-[#000] hover:bg-[#fff] border-2 border-black duration-200"
                >
                  Log in to order
                </Link>
              </div>
            )}
          </div>
        </NewLayout>
      ) : (
        <NewLayout>
          <div className="container p-5">
            <img
              src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
              alt=""
              className="w-full object-cover max-h-[600px]"
            />
            <Link
              to="/"
              className="text-xl flex justify-center uppercase underline hover:text-red-800"
            >
              Return home to buy item{" "}
            </Link>
          </div>
        </NewLayout>
      )}
    </>
  );
};

export default Cart;
