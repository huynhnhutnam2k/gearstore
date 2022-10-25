/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../../store/product-store";
import { useAuthStore } from "../../store/auth-store";
import { toast } from "react-toastify";
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
  } = useProductStore();
  const { userInfo } = useAuthStore();
  useEffect(() => {
    fetch();
  }, [msg]);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Delete successfully", { containerId: "A" });
      resetState();
    }
    if (isError) {
      toast.error("Your request is error", { containerId: "A" });
      resetState();
    }
  }, [isError, isSuccess]);
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between h-10 items-center">
          <div className="bg-purple-500 text-white w-[120px] p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer">
            List product
          </div>
          <Link
            to="/add-products"
            className="bg-purple-500 text-white w-[120px] p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer"
          >
            Add product
          </Link>
        </div>
        <div className="w-full flex justify-end gap-x-2 h-10 items-center relative my-2">
          <div className="w-[300px] relative h-10">
            <input
              type="text"
              placeholder="Search"
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
            <option value="">Sort by</option>
            <option value="pricedecre">Price decre</option>
            <option value="priceincre">Price incre</option>
            <option value="created">Create</option>
          </select>
        </div>
        <div className="flex flex-col gap-y-3 ">
          {products?.map((item, i) => (
            <div className="my-5" key={i}>
              <div className=" h-[200px] px-32 py-6 ">
                <div className="flex justify-between h-full border-b-2 border-b-slate-300">
                  <div className="flex gap-x-5 flex-1">
                    <img
                      src={item.image1}
                      alt=""
                      className="h-full max-w-[200px]"
                    />
                    <div className="flex flex-col justify-center gap-y-2 text-sm">
                      <div className="">{item.name}</div>
                      <div className="">{item?.category?.name}</div>
                    </div>
                    <div className="flex flex-col justify-center gap-y-2 text-sm">
                      <div className="">In stock : {item.countInStock}</div>
                      <div className="">Price: {item.price}</div>
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
                      onClick={() => deleteAProduct(item._id, userInfo?.token)}
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
