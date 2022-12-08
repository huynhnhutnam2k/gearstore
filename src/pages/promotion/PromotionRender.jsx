/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { usePromotionStore } from "../../store/promotion-store";

const PromotionRender = () => {
  const {
    promotions,
    fetch,
    isSuccess,
    isError,
    delete: deletePromotion,
    resetState,
  } = usePromotionStore();
  useEffect(() => {
    fetch();
  }, [isSuccess, isError]);
  const toastId = useRef(null);
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
  }, [isSuccess, isError]);
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between h-10 items-center">
          <div className="bg-purple-500 text-white  p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer">
            Danh mục voucher
          </div>
          <Link
            to="/add-promotion"
            className="bg-purple-500 text-white  p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer"
          >
            Thêm voucher
          </Link>
        </div>
        <div className="flex flex-col gap-y-3 ">
          {promotions?.map((item, i) => (
            <div className="my-5" key={i}>
              <div className=" h-[200px] px-32 py-6 ">
                <div className="flex justify-between h-full border-b-2 border-b-slate-300">
                  <div className="flex gap-x-5 flex-1">
                    <div className="flex flex-col justify-center gap-y-2 text-sm">
                      <div className="text-xl font-bold uppercase">
                        {item.code}
                      </div>
                      <div className="">
                        {Math.round(
                          (item.expireIn - new Date().getTime()) / 86400000
                        ) >= 0 ? (
                          <div className="">
                            {" "}
                            Thời gian còn lại:{" "}
                            {Math.round(
                              (item.expireIn - new Date().getTime()) / 86400000
                            )}{" "}
                            ngày
                          </div>
                        ) : (
                          <div className="">Voucher đã hết hạn</div>
                        )}
                      </div>
                      <div className="">Giá trị: {item.percent} %</div>
                    </div>
                  </div>
                  <div className="h-full flex items-center gap-x-2 ">
                    <Link
                      to={`/promotion/${item._id}`}
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
                        deletePromotion(item._id);
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

export default PromotionRender;
