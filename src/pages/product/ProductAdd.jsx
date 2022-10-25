/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useFormik } from "formik";
import { v4 } from "uuid";
import * as yup from "yup";
import { useCategoryStore } from "../../store/category-store";
import { useEffect } from "react";
import { useProductStore } from "../../store/product-store";
import { useAuthStore } from "../../store/auth-store";
import { toast } from "react-toastify";
const ProductAdd = () => {
  const { listCategory, getListCategory } = useCategoryStore();
  const { userInfo } = useAuthStore();
  const { addProduct, isSuccess, isError, resetState } = useProductStore();
  useEffect(() => {
    getListCategory();
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      image1: "",
      image2: "",
      price: "",
      description: "",
      countInStock: "",
      category: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      image1: yup.string().required(),
      image2: yup.string().required(),
      price: yup.string().required(),
      description: yup.string().required(),
      countInStock: yup.string().required(),
      category: yup.string().required(),
    }),
    onSubmit: async (values) => {
      if (values.image1 === "" || values.image2 === "null") return;
      const image1Ref = ref(storage, `images/${values.image1.size + v4()}`);
      const image2Ref = ref(storage, `images/${values.image2.size + v4()}`);

      await uploadBytes(image1Ref, values.image1).then(() => {
        console.log("Upload 1 success");
      });
      await uploadBytes(image2Ref, values.image2).then(() => {
        console.log("Upload success");
      });
      let img1Url = "";
      let img2Url = "";
      await getDownloadURL(image1Ref).then((rs) => {
        img1Url = rs;
      });
      await getDownloadURL(image2Ref).then((rs) => {
        img2Url = rs;
      });
      const makeProduct = {
        ...values,
        image1: img1Url,
        image2: img2Url,
      };
      addProduct(makeProduct, userInfo?.token);
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Add successfully", { containerId: "A" });
      resetState();
    }
    if (isError) {
      toast.error("Add failed", { containerId: "A" });
      resetState();
    }
  }, [isSuccess, isError]);
  return (
    <div className="px-5">
      <div className="bg-purple-500 text-white w-[200px] p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer">
        Add products page
      </div>
      <form
        action=""
        className="my-2 overflow-auto flex flex-col gap-y-2"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
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
            <option value="#">Category</option>
            {listCategory.map((item) => (
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

export default ProductAdd;
