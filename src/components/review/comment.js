/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { reviewProduct } from "app/productSlice";
import { useLocation } from "react-router-dom";

const Comment = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // console.log(pathname);
  const id = pathname.split("/")[2];
  const { userInfo } = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      name: userInfo?.username,
      avatar: userInfo?.avatar,
      comment: "",
      rating: 0,
      user: userInfo?._id,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      // console.log(values);
      const review = {
        ...values,
        rating: +values.rating,
      };
      dispatch(reviewProduct({ review, id }));
    },
  });
  // const { msg, isError, isLoading } = useSelector((state) => state.product);
  // const toastId = useRef();
  // useEffect(() => {
  //   if (isError && !isLoading) {
  //     toast.dismiss(toastId.current);
  //     toast.error("Comment failed", { containerId: "A" });
  //     dispatch(resetState());
  //   } else if (msg !== "" && !isLoading) {
  //     toast.dismiss(toastId.current);
  //     toast.success(msg, { containerId: "A" });
  //     dispatch(resetState());
  //   } else if (isLoading) {
  //     toastId.current = toast.info("Please wait...", {
  //       containerId: "A",
  //       autoClose: false,
  //     });
  //   }
  // }, [msg, isError, isLoading]);
  return (
    <div className="flex flex-col items-stretch px-32">
      <div className=" pb-4 border-b border-b-[#ccc]">
        <div className="flex gap-x-2">
          <div className="">{formik.values.name}</div>
        </div>
        <select
          name="rating"
          onChange={formik.handleChange}
          value={formik.values.rating}
          id=""
          className="outline-none border rounded-md"
        >
          <option value="">Select...</option>
          <option value="1">1 - Rất tệ</option>
          <option value="2">2 - Tệ</option>
          <option value="3">3 - Bình thường</option>
          <option value="4">4 - Tốt</option>
          <option value="5">5 - Rất tốt</option>
        </select>
        <div className="flex flex-col gap-y-1">
          <label className="py-1 uppercase">Bình luận</label>
          <textarea
            name="comment"
            onChange={formik.handleChange}
            value={formik.values.comment}
            placeholder="Thêm bình luận"
            className="w-full border-2 border-black p-2 resize-none"
          ></textarea>
        </div>
        <button
          // type="submit"
          onClick={formik.handleSubmit}
          className="w-[200px] border-2 border-[#000] bg-[#000] text-[#fff] uppercase text-center py-2 cursor-pointer mt-3 hover:bg-[#fff] hover:text-[#000] duration-200"
        >
          Đăng bình luận
        </button>
      </div>
    </div>
  );
};

export default Comment;
