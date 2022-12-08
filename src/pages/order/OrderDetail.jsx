/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import React, { useEffect, useRef } from "react";
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
  const tus = {
    pending: "Chờ xác nhận",
    processing: "Chờ lấy hàng",
    shipping: "Đang giao",
    completed: "Hoàn tất",
    cancelled: "Đã hủy",
  };
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
      toastId.current = toast.info("Đang xử lý", {
        containerId: "A",
        autoClose: false,
      });
      const body = {
        email: order?.user?.email,
        status: values.status,
      };
      // console.log(body);
      editOrder(id, body, userInfo?.token);
    },
  });
  const toastId = useRef(null);
  useEffect(() => {
    if (isSuccess) {
      toast.dismiss(toastId.current);
      toast.success("Cập nhật thành công", { containerId: "A" });
      resetState();
    }
    if (isError) {
      toast.dismiss(toastId.current);
      toast.error("Cập nhật thất bại", { containerId: "A" });
      resetState();
    }
  }, [isSuccess, isError]);
  return (
    <div className="p-5 text-base">
      <div className="mb-2 border-b-2 border-b-[#ccc]">
        <div className="">Thông tin khách hàng</div>
        <div className="flex flex-col px-4">
          <li className="">Tên khách hàng: {order?.user?.name}</li>
          <li className="">Số điện thoại: {order?.user?.phone}</li>
          <li className="">Email: {order?.user?.email}</li>
        </div>
      </div>
      <div className="mb-2 border-b-2 border-b-[#ccc]">
        <div className="">Địa chỉ giao hàng</div>
        <div className="flex flex-col px-4">
          <li className="">Thành phố: {order?.shippingAddress?.city}</li>
          <li className="">Quận : {order?.shippingAddress?.districts}</li>
          <li className="">Huyện : {order?.shippingAddress?.ward}</li>
          <li className="">Địa chỉ: {order?.shippingAddress?.address}</li>
        </div>
      </div>
      <div className="mb-2 border-b-2 border-b-[#ccc]">
        <div className="">Đơn hàng</div>
        <div className="px-4">Trạng thái đơn hàng</div>
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
              {tus[formik?.values?.status]}
            </option>
            {status
              .filter((i) => i !== formik?.values?.status)
              .map((item) => (
                <option
                  value={item.value}
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
                  {item.display}
                </option>
              ))}
          </select>
          <div
            className="h-10 uppercase border-2 border-black p-2 cursor-pointer bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] duration-200 "
            onClick={formik.handleSubmit}
          >
            Thay đổi
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
        <div className="">Chi tiết đơn hàng</div>
        <div className="px-4 py-2">
          {order?.orderItems?.map((item, i) => (
            <div className="my-5" key={i}>
              <div className=" h-[200px] px-32 py-6 ">
                <div className="flex justify-between h-full border-b-2 border-b-slate-300">
                  <div className="flex gap-x-5 flex-1">
                    <img
                      src={item.image[0]}
                      alt=""
                      className="h-full max-w-[200px]"
                    />
                    <div className="flex flex-col justify-center gap-y-2 text-sm">
                      <div className="capitalize">{item.name}</div>
                      <div className="">Số lượng : {item.qty}</div>
                      <div className="">Đơn giá: {item.price}</div>
                      <div className="">
                        Tổng cộng:{" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price * item.qty)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="px-32 flex justify-end">
            Tổng đơn hàng:{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(order.totalPrice)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
