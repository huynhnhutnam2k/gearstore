import { useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useProductStore } from "../../store/product-store";
import * as yup from "yup";
import { useCategoryStore } from "../../store/category-store";
const ProductEdit = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { getAProduct, product } = useProductStore();
  const { listCategory, getListCategory } = useCategoryStore();
  // console.log(product);
  const formik = useFormik({
    initialValues: {
      name: product?.name,
      image1: product?.image1,
      image2: product?.image2,
      price: product?.price,
      description: product?.description,
      countInStock: product?.countInStock,
      category: product?.category?.name,
      salePercent: product?.salePercent,
    },
    validationSchema: yup.object({}),
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  useEffect(() => {
    getAProduct(id);
    getListCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div className="px-5">
      <div className="bg-purple-500 text-white w-[200px] p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer">
        Edit products page
      </div>
      <form
        action=""
        className="my-2 overflow-auto flex flex-col gap-y-2"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        enableReinitialize={true}
      >
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name">Name product</label>
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
          <label htmlFor="price">Price product</label>
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
          <label htmlFor="sale">Sale percent</label>
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
          <label htmlFor="countInStock">Count in stock </label>
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
          <label htmlFor="description">Description product</label>
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
          <label htmlFor="category">Category </label>
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
        <div className="flex flex-col gap-y-2">
          <label htmlFor="image1">Image 1 </label>
          <input
            type="file"
            className="w-full p-2 border-2 border-black outline-none"
            id="image1"
            name="image1"
            onChange={(e) => {
              formik.setFieldValue("image1", e.target.files[0]);
            }}
          />
          <img src={formik.values.image1} alt="" className="max-w-[100px]" />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="image2">Image 2 </label>
          <input
            type="file"
            className="w-full p-2 border-2 border-black outline-none"
            id="image2"
            name="image2"
            onChange={(e) => {
              formik.setFieldValue("image2", e.target.files[0]);
            }}
          />
          <img src={formik.values.image2} alt="" className="max-w-[100px]" />
        </div>

        <button
          type="submit"
          className="w-full mt-2 p-2 border-2 border-black bg-[#000] text-[#fff] flex justify-center uppercase hover:text-[#000] hover:bg-[#fff] duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
