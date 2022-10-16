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
        <div className="">Something wrong, please redirect to home page</div>
      </div>
    </NewLayout>
  );
};

export default ErrorPage;
