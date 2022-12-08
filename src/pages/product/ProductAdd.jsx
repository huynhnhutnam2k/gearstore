/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useFormik } from "formik";
import { v4 } from "uuid";
import * as yup from "yup";
import { useCategoryStore } from "../../store/category-store";
import { useEffect } from "react";
import { useProductStore } from "../../store/product-store";
import { useAuthStore } from "../../store/auth-store";
// import { storage } from "../../firebase";
import { toast } from "react-toastify";
import { useRef } from "react";
const ProductAdd = () => {
  const { listCategory, getListCategory } = useCategoryStore();
  const { userInfo } = useAuthStore();
  const [images, setImages] = useState([]);
  const { addProduct, isSuccess, isError, resetState, isLoading } =
    useProductStore();
  useEffect(() => {
    getListCategory();
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      countInStock: "",
      category: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      // image1: yup.string().required(),
      // image2: yup.string().required(),
      price: yup.string().required(),
      description: yup.string().required(),
      countInStock: yup.string().required(),
      category: yup.string().required(),
    }),
    onSubmit: async (values) => {
      toastId.current = toast.info("Đang xử lý", {
        containerId: "A",
        autoClose: false,
      });
      let url = [];
      for await (const image of images) {
        const storageRef = ref(storage, `images/${image.name + v4()} `);
        await uploadBytes(storageRef, image).then(() => {
          console.log("Upload 1 success");
        });
        await getDownloadURL(storageRef)
          .then((urls) => {
            url.push(urls);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      const makeProduct = {
        ...values,
        image: url,
      };
      addProduct(makeProduct, userInfo?.token);
    },
  });
  const toastId = useRef(null);
  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.dismiss(toastId.current);
      toast.success("Thêm sản phẩm thành công", { containerId: "A" });
      resetState();
    } else if (!isLoading && isError) {
      toast.dismiss(toastId.current);
      toast.error("Thêm sản phẩm thất bại", { containerId: "A" });
      resetState();
    }
  }, [isSuccess, isError, isLoading]);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  // const handleUpload = async () => {
  //   const promises = [];
  //   images.map(async (image) => {
  //     const storageRef = ref(storage, `files/${image.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, image);
  //     promises.push(uploadTask);
  //     await uploadBytes(storageRef, image).then(() => {
  //       console.log("Upload 1 success");
  //     });
  //     await getDownloadURL(storageRef)
  //       .then((urls) => {
  //         setUrls((prev) => [...prev, urls]);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  // };
  return (
    <div className="px-5">
      <div className="bg-purple-500 text-white w-[200px] p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer">
        Trang thêm sản phẩm
      </div>
      <form
        action=""
        className="my-2 overflow-auto flex flex-col gap-y-2"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
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
          <label htmlFor="countInStock">Số lượng sản phẩm</label>
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
          <label htmlFor="category">Tên danh mục</label>
          <select
            name="category"
            id=""
            onChange={formik.handleChange}
            value={formik.values.category}
            className="w-full p-2 border-2 border-black outline-none"
          >
            <option value="#">Danh mục</option>
            {listCategory.map((item) => (
              <option value={item._id} className="capitalize font-bold">
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="image">Hình ảnh sản phẩm</label>
          <input
            type="file"
            className="w-full p-2 border-2 border-black outline-none"
            multiple
            onChange={handleChange}
            // name="image"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-2 p-2 border-2 border-black bg-[#000] text-[#fff] flex justify-center uppercase hover:text-[#000] hover:bg-[#fff] duration-200"
        >
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
