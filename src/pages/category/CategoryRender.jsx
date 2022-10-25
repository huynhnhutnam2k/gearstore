/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCategoryStore } from "../../store/category-store";
import { useAuthStore } from "../../store/auth-store";
import { toast } from "react-toastify";
const CategoryRender = () => {
  const { userInfo } = useAuthStore();
  const {
    listCategory,
    getListCategory,
    deleteCategory,
    isSuccess,
    isError,
    resetState,
  } = useCategoryStore();
  useEffect(() => {
    getListCategory();
  }, [isSuccess, isError]);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Delete successfully", { containerId: "A" });
      resetState();
    }
    if (isError) {
      toast.error("Delete failed", { containerId: "A" });
      resetState();
    }
  }, [isSuccess, isError]);
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between h-10 items-center">
          <div className="bg-purple-500 text-white  p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer">
            List categories
          </div>
          <Link
            to="/add-category"
            className="bg-purple-500 text-white  p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer"
          >
            Add category
          </Link>
        </div>
        <div className="flex flex-col gap-y-3 ">
          {listCategory?.map((item, i) => (
            <div className="my-5" key={i}>
              <div className=" h-[200px] px-32 py-6 ">
                <div className="flex justify-between h-full border-b-2 border-b-slate-300">
                  <div className="flex gap-x-5 flex-1">
                    <div className="flex flex-col justify-center gap-y-2 text-sm">
                      <div className="text-xl font-bold">{item.name}</div>
                      <div className="">Lorem ipsum dolor sit amet.</div>
                      <div className="">In stock : 33</div>
                    </div>
                  </div>
                  <div className="h-full flex items-center gap-x-2 ">
                    <Link
                      to={`/edit-category/${i + 1}`}
                      className="w-10 h-10 justify-center items-center flex cursor-pointer"
                    >
                      <i className="bx bx-pencil"></i>
                    </Link>
                    <div
                      className="flex justify-center items-center w-10 h-10 text-white rounded-full bg-slate-400 cursor-pointer"
                      onClick={() => deleteCategory(item._id, userInfo?.token)}
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

export default CategoryRender;
