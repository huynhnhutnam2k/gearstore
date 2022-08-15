import { Button } from "components/button";
import Layout from "components/layout/layout";
import React from "react";

const Payment = () => {
  const [payment, setPayment] = React.useState("");
  const handlePayment = (e) => {
    e.preventDefault();
    console.log(payment);
  };
  return (
    <Layout>
      <div className="w-full max-w-[560px] shadow-md rounded-md border-[#ccc] p-5 mx-auto mt-10">
        <div className="w-full bg-green-400 text-white text-center p-2">
          Chọn phương thức thanh toán
        </div>
        <form action="" className="" onSubmit={handlePayment}>
          <div className="flex h-10 items-center gap-x-2">
            <input
              type="radio"
              name="payment"
              id="payment"
              onClick={(e) => setPayment(e.target.value)}
            />
            <label htmlFor="payment" className="flex items-center">
              Thanh toán khi nhận hàng
            </label>
          </div>
          <Button>Hoàn tất đặt hàng</Button>
        </form>
      </div>
    </Layout>
  );
};

export default Payment;
