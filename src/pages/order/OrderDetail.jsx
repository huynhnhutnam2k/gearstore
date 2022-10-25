/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useOrderStore } from "../../store/order-store";
import { useAuthStore } from "../../store/auth-store";
import { toast } from "react-toastify";
const OrderDetail = () => {
  const { pathname } = useLocation();
  const {
    getOrderDetail,
    order,
    status,
    editOrder,
    isSuccess,
    isError,
    resetState,
  } = useOrderStore();
  const { userInfo } = useAuthStore();
  const id = pathname.split("/")[2];

  useEffect(() => {
    getOrderDetail(id);
    window.scrollTo(0, 0, "smooth");
  }, []);
  const formik = useFormik({
    initialValues: {
      status: order?.status,
    },
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      const body = {
        email: order?.user?.email,
        status: values.status,
      };
      // console.log(body);
      editOrder(id, body, userInfo?.token);
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Update successfully", { containerId: "A" });
      resetState();
    }
    if (isError) {
      toast.error("Upadte failed", { containerId: "A" });
      resetState();
    }
  }, [isSuccess, isError]);
  return (
    <div className="p-5">
      <div className="mb-2 border-b-2 border-b-[#ccc]">
        <div className="">Customer</div>
        <div className="flex flex-col px-4">
          <li className="">Name: {order?.user?.name}</li>
          <li className="">Phone: {order?.user?.phone}</li>
          <li className="">Email: {order?.user?.email}</li>
        </div>
      </div>
      <div className="mb-2 border-b-2 border-b-[#ccc]">
        <div className="">Shipping Address</div>
        <div className="flex flex-col px-4">
          <li className="">City: {order?.shippingAddress?.city}</li>
          <li className="">Districts: {order?.shippingAddress?.districts}</li>
          <li className="">Ward: {order?.shippingAddress?.ward}</li>
          <li className="">Address: {order?.shippingAddress?.address}</li>
        </div>
      </div>
      <div className="mb-2 border-b-2 border-b-[#ccc]">
        <div className="">Order</div>
        <div className="px-4">
          Change <status></status>
        </div>
        <div className=" px-4 flex gap-x-2">
          <select
            name="status"
            onChange={formik.handleChange}
            value={formik.values.status}
            id=""
            className={`h-10 border-2 border-black p-2 capitalize ${
              formik?.values?.status === "processing"
                ? "text-orange-400"
                : formik?.values?.status === "shipping"
                ? "text-yellow-200"
                : formik?.values?.status === "completed"
                ? "text-green-400"
                : formik?.values?.status === "cancelled"
                ? "text-red-300"
                : "text-black"
            }`}
          >
            <option
              value={formik?.values?.status}
              className={` text-sm capitalize ${
                formik?.values?.status === "processing"
                  ? "text-orange-400"
                  : formik?.values?.status === "shipping"
                  ? "text-yellow-200"
                  : formik?.values?.status === "completed"
                  ? "text-green-400"
                  : formik?.values?.status === "cancelled"
                  ? "text-red-300"
                  : "text-black"
              } `}
            >
              {formik?.values?.status}
            </option>
            {status
              .filter((i) => i !== formik?.values?.status)
              .map((item) => (
                <option
                  value={item}
                  className={`capitalize text-sm px-4 inline-block ${
                    item === "processing"
                      ? "text-orange-400"
                      : item === "shipping"
                      ? "text-yellow-200"
                      : item === "completed"
                      ? "text-green-400"
                      : item === "cancelled"
                      ? "text-red-300"
                      : "text-black"
                  }`}
                >
                  {item}
                </option>
              ))}
          </select>
          <div
            className="h-10 uppercase border-2 border-black p-2 cursor-pointer bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] duration-200 "
            onClick={formik.handleSubmit}
          >
            Submit
          </div>
        </div>
        <div className="flex flex-col px-4">
          <li className="">{order?.user?.name}</li>
          <li className="">{order?.user?.phone}</li>
          <li className="">{order?.user?.email}</li>
          <li className="">{order?.user?.username}</li>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="">Order Items</div>
        <div className="px-4 py-2">
          {order?.orderItems?.map((item, i) => (
            <div className="my-5" key={i}>
              <div className=" h-[200px] px-32 py-6 ">
                <div className="flex justify-between h-full border-b-2 border-b-slate-300">
                  <div className="flex gap-x-5 flex-1">
                    <img
                      src={item.image1 || item.image2}
                      alt=""
                      className="h-full max-w-[200px]"
                    />
                    <div className="flex flex-col justify-center gap-y-2 text-sm">
                      <div className="">{item.name}</div>
                      <div className="">Quantity : {item.qty}</div>
                      <div className="">Price: {item.price}</div>
                      <div className="">Total: {item.price * item.qty}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="px-32 flex justify-end">
            Total Order: {order?.totalPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
