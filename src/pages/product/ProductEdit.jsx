/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useProductStore } from "../../store/product-store";
import * as yup from "yup";
import { useCategoryStore } from "../../store/category-store";
import { useAuthStore } from "../../store/auth-store";
import { toast } from "react-toastify";
const ProductEdit = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { userInfo } = useAuthStore();
  const {
    getAProduct,
    product,
    updateAProduct,
    isLoading,
    isSuccess,
    isError,
    resetState,
  } = useProductStore();
  const { listCategory, getListCategory } = useCategoryStore();
  const formik = useFormik({
    initialValues: {
      name: product?.name,
      image: product?.image,
      price: product?.price,
      description: product?.description,
      countInStock: product?.countInStock,
      category: product?.category?.name,
      salePercent: product?.salePercent,
    },
    validationSchema: yup.object({}),
    enableReinitialize: true,
    onSubmit: async (values) => {
      updateAProduct(id, values, userInfo?.token);
    },
  });

  useEffect(() => {
    getAProduct(id);
    getListCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const toastId = useRef(null);
  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.dismiss(toastId.current);
      toast.success("Chỉnh sửa sản phẩm thành công", { containerId: "A" });
      resetState();
    } else if (!isLoading && isError) {
      toast.dismiss(toastId.current);
      toast.error("Chỉnh sửa sản phẩm thất bại", { containerId: "A" });
      resetState();
    }
  }, [isSuccess, isError, isLoading]);
  return (
    <div className="px-5">
      <div className="bg-purple-500 text-white w-[240px] p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer">
        Trang chỉnh sửa sản phẩm
      </div>
      <form
        action=""
        className="my-2 overflow-auto flex flex-col gap-y-2"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        enableReinitialize={true}
      >
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-black outline-none"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="price">Giá sản phẩm</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-black outline-none"
            id="price"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="sale">Giảm giá</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-black outline-none"
            id=""
            name="salePercent"
            onChange={formik.handleChange}
            value={formik.values.salePercent}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="countInStock">Tồn kho</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-black outline-none"
            id="countInStock"
            name="countInStock"
            onChange={formik.handleChange}
            value={formik.values.countInStock}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="description">Mô tả sản phẩm</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-black outline-none"
            id=""
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="category">Danh mục sản phẩm </label>
          <select
            name="category"
            id=""
            onChange={formik.handleChange}
            value={formik.values.category}
            className="w-full p-2 border-2 border-black outline-none"
          >
            <option value={product?.category?._id}>
              {formik.values.category}
            </option>
            {listCategory
              .filter((item) => item.name !== formik.values.category)
              .map((item) => (
                <option value={item._id} className="capitalize font-bold">
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex">
          {formik.values?.image?.map((item) => (
            <img src={item} alt="" className="max-w-[100px]" />
          ))}
        </div>
        <button
          type="submit"
          className="w-full mt-2 p-2 border-2 border-black bg-[#000] text-[#fff] flex justify-center uppercase hover:text-[#000] hover:bg-[#fff] duration-200"
        >
          Chỉnh sửa sản phẩm
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
