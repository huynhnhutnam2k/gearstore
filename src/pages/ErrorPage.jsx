import React from "react";
import { ErrorImage } from "asset/image/image";
import NewLayout from "components/layout/NewLayout";
const ErrorPage = () => {
  return (
    <NewLayout>
      <div className="container p-5 flex justify-center flex-col items-center gap-y-3">
        <img
          src={ErrorImage}
          alt=""
          className="w-[450px] h-[400px] object-cover"
        />
        <div className="">Trang này không tồn tại, vui lòng quay lại</div>
      </div>
    </NewLayout>
  );
};

export default ErrorPage;
