/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../../store/product-store";
import { useAuthStore } from "../../store/auth-store";
import { toast } from "react-toastify";
import { useRef } from "react";
const ProductRender = () => {
  const {
    products,
    fetch,
    keyword,
    setKeyword,
    searchProduct,
    deleteAProduct,
    msg,
    isSuccess,
    isError,
    sort,
    resetState,
    isLoadingDel,
  } = useProductStore();
  const { userInfo } = useAuthStore();
  useEffect(() => {
    fetch();
  }, [msg]);
  const toastId = useRef();
  useEffect(() => {
    if (isSuccess) {
      toast.dismiss(toastId.current);
      toast.success("Xóa thành công", { containerId: "A" });
      resetState();
    }
    if (isError) {
      toast.dismiss(toastId.current);
      toast.error("Xóa thất bại", { containerId: "A" });
      resetState();
    }
  }, [isError, isSuccess, isLoadingDel]);
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between h-10 items-center">
          <div className="bg-purple-500 text-white  p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer">
            Danh mục sản phẩm
          </div>
          <Link
            to="/add-products"
            className="bg-purple-500 text-white  p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer"
          >
            Thêm sản phẩm
          </Link>
        </div>
        <div className="w-full flex justify-end gap-x-2 h-10 items-center relative my-2">
          <div className="w-[300px] relative h-10">
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full h-full  border-2 border-black text-[#ccc] outline-none text-sm px-2"
            />
            <div
              className="absolute top-1/2 right-1 -translate-y-1/2 h-10 w-10 flex justify-center items-center cursor-pointer text-[#000] text-2xl"
              onClick={() => searchProduct()}
            >
              <ion-icon name="search-circle-outline"></ion-icon>
            </div>
          </div>
          <select
            name=""
            id=""
            onChange={(e) => sort(e.target.value)}
            className="p-2 border-2 border-black outline-none h-10 text-sm"
          >
            <option value="">Sắp xếp </option>
            <option value="pricedecre">Giá tăng dần</option>
            <option value="priceincre">Giá giảm dần</option>
            <option value="created">Thời gian</option>
          </select>
        </div>
        <div className="flex flex-col gap-y-3 ">
          {products?.map((item, i) => (
            <div className="my-5" key={i}>
              <div className=" h-[200px] px-32 py-6 ">
                <div className="flex justify-between h-full border-b-2 border-b-slate-300">
                  <div className="flex gap-x-5 flex-1 h-full ">
                    <img
                      src={item.image[0]}
                      alt=""
                      className="h-[150px] max-w-[150px] object-cover"
                    />
                    <div className="flex flex-col justify-center gap-y-2 text-sm ">
                      <div className="capitalize max-w-[300px]">
                        {item.name}
                      </div>
                      <div className="">Danh mục: {item?.category?.name}</div>
                    </div>
                    <div className="flex flex-col justify-center gap-y-2 text-sm ml-auto ">
                      <div className="">Tồn kho : {item.countInStock}</div>
                      {item.salePercent !== 0 ? (
                        <div className="">
                          Giá:{" "}
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(
                            item.price - (item.salePercent * item.price) / 100
                          )}
                          {"("} {item.salePercent} {"%)"}
                        </div>
                      ) : (
                        <div className="">
                          Giá:{" "}
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="h-full flex items-center gap-x-2 ">
                    <Link
                      to={`/edit-products/${item._id}`}
                      className="w-10 h-10 justify-center items-center flex cursor-pointer"
                    >
                      <i className="bx bx-pencil"></i>
                    </Link>
                    <div
                      className="flex justify-center items-center w-10 h-10 text-white rounded-full bg-slate-400 cursor-pointer"
                      onClick={() => {
                        toastId.current = toast.info("Đang xử lý", {
                          containerId: "A",
                          autoClose: false,
                        });
                        deleteAProduct(item._id, userInfo?.token);
                      }}
                    >
                      <i className="bx bx-x"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductRender;
