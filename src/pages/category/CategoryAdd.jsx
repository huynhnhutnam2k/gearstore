import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import { useAuthStore } from "../../store/auth-store";
import { useCategoryStore } from "../../store/category-store";
import { toast } from "react-toastify";
const CategoryAdd = () => {
  const { addCategory, isError, isSuccess, resetState } = useCategoryStore();
  const { userInfo } = useAuthStore();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("name is required"),
    }),
    onSubmit: (values) => {
      addCategory(values.name, userInfo?.token);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);
  return (
    <div className="px-5">
      <div className="bg-purple-500 text-white w-[200px] p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer">
        Add category page
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

export default CategoryAdd;
