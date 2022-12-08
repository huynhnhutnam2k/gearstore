/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";
import { usePromotionStore } from "../../store/promotion-store";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
const PromotionEdit = () => {
  const { promotion, get, update, isError, isSuccess, resetState } =
    usePromotionStore();
  const formik = useFormik({
    initialValues: {
      promotion: promotion.code,
      expireIn: Math.round(
        (promotion.expireIn - new Date().getTime()) / 86400000
      ),
      percent: promotion.percent,
    },
    validationSchema: yup.object({
      promotion: yup.string().required("Promotion is required"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      toastId.current = toast.info("Đang xử lý", {
        containerId: "A",
        autoClose: false,
      });
      const voucher = {
        code: values.promotion,
        expireIn: new Date().getTime() + 86400 * values.expireIn * 1000,
        percent: +values.percent,
      };
      update(id, voucher);
    },
  });
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  useEffect(() => {
    get(id);
  }, [id]);
  const toastId = useRef(null);
  useEffect(() => {
    if (isSuccess) {
      toast.dismiss(toastId.current);
      toast.success("Chỉnh sửa voucher thành công", { containerId: "A" });
      resetState();
    }
    if (isError) {
      toast.dismiss(toastId.current);
      toast.error("Chỉnh sửa voucher thất bại", { containerId: "A" });
      resetState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);
  return (
    <div className="px-5">
      <div className="bg-purple-500 text-white w-[200px] p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer">
        Trang thêm voucher
      </div>
      <form
        action=""
        className="my-2 overflow-auto flex flex-col gap-y-2"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-y-2">
          <label htmlFor="promotion">Mã</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-black outline-none uppercase"
            id="promotion"
            name="promotion"
            onChange={formik.handleChange}
            value={formik.values.promotion}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="expireIn">Thời gian (Ngày)</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-black outline-none"
            id="expireIn"
            name="expireIn"
            onChange={formik.handleChange}
            value={formik.values.expireIn}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="percent">Giá trị voucher</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-black outline-none"
            id="percent"
            name="percent"
            onChange={formik.handleChange}
            value={formik.values.percent}
          />
        </div>
        <button
          type="submit"
          className="w-full mt-2 p-2 border-2 border-black bg-[#000] text-[#fff] flex justify-center uppercase hover:text-[#000] hover:bg-[#fff] duration-200"
        >
          Chỉnh sửa
        </button>
      </form>
    </div>
  );
};

export default PromotionEdit;
