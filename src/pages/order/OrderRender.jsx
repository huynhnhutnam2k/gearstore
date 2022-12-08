/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth-store";
import { useOrderStore } from "../../store/order-store";
import { toast } from "react-toastify";
const OrderRender = () => {
  const {
    fetchAll,
    orders,
    status,
    setSort,
    search,
    setSearch,
    sort,
    isLoading,
    resetState,
    isError,
    isSuccess,
    deleteOrder,
  } = useOrderStore();
  const { userInfo } = useAuthStore();
  const tus = {
    pending: "Chờ xác nhận",
    processing: "Chờ lấy hàng",
    shipping: "Đang giao",
    completed: "Hoàn tất",
    cancelled: "Đã hủy",
  };
  const handleSearch = () => {};
  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);
  const toastId = useRef(null);
  useEffect(() => {
    if (isSuccess) {
      toast.dismiss(toastId.current);
      toast.success("Xóa thành công", { containerId: "A" });
      resetState();
    } else if (isError) {
      toast.dismiss(toastId.current);
      toast.error("Xóa thất bại", { containerId: "A" });
      resetState();
    }
  }, [isError, isLoading, isSuccess]);
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between h-10 items-center">
          <div className="bg-purple-500 text-white  p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer">
            Danh sách đơn hàng
          </div>
        </div>
        <div className="flex gap-x-2 h-10 items-center justify-end">
          <div className="relative w-[300px] h-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm"
              className="w-full h-full p-2 border-2 border-black text-[#ccc] outline-none text-sm"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-1 w-10 h-10 text-2xl items-center flex justify-center text-black cursor-pointer "
              onClick={handleSearch}
            >
              <ion-icon name="search-circle-outline"></ion-icon>
            </div>
          </div>
          <select
            name=""
            id=""
            onChange={(e) => {
              setSort(e.target.value);
              fetchAll(sort);
            }}
            className="p-2 h-full border-2 border-black text-sm capitalize"
          >
            <option value="">Trạng thái</option>
            {status.map((item) => (
              <option value={item.value} className="capitalize">
                {item.display}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col ">
          {orders?.length > 0 ? (
            orders?.map((item, i) => (
              <div className="my-5" key={i}>
                <div className=" h-[200px] px-32 py-6 ">
                  <div className="flex justify-between h-full border-b-2 border-b-slate-300">
                    <div className="flex gap-x-5 flex-1 capitalize">
                      <div className="flex flex-col justify-center gap-y-2 text-sm">
                        <div className="max-w-[100px] truncate">
                          {item?.user?.name}
                        </div>
                        <div className="">{item?.user?.phone}</div>
                        <div className="max-w-[100px] truncate">
                          {item?.user?.email}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center gap-y-2 text-sm">
                        <div className="">
                          Số lượng :{" "}
                          {item?.orderItems?.reduce((a, b) => a + b.qty, 0)}
                        </div>
                        <div className="">
                          Sản phẩm : {item?.orderItems?.length}
                        </div>
                        <div className="">
                          Tổng tiền :{" "}
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.totalPrice)}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center gap-y-2 text-sm">
                        <div
                          className={`${
                            item?.status === "processing"
                              ? "text-orange-400"
                              : item?.status === "shipping"
                              ? "text-yellow-500"
                              : item?.status === "completed"
                              ? "text-green-400"
                              : item?.status === "cancelled"
                              ? "text-red-300"
                              : "text-black"
                          }`}
                        >
                          {tus[item?.status]}
                        </div>
                      </div>
                    </div>
                    <div className="h-full flex items-center gap-x-2 ">
                      <Link
                        to={`/orders/${item._id}`}
                        className="w-10 h-10 justify-center items-center flex cursor-pointer"
                      >
                        <ion-icon name="eye-outline"></ion-icon>
                      </Link>
                      <div
                        className="flex justify-center items-center w-10 h-10 text-white rounded-full bg-slate-400 cursor-pointer"
                        onClick={() => {
                          toastId.current = toast.info("Đang xử lý", {
                            containerId: "A",
                            autoClose: false,
                          });
                          deleteOrder(item._id, userInfo?.token);
                        }}
                      >
                        <i className="bx bx-x"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-black rounded bg-red-300 text-sm mt-10">
              Không có đơn hàng nào{" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderRender;
