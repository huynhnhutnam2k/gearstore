import React, { useState } from "react";
import Data from "constant/data.json";
import { useForm } from "react-hook-form";
import { Button } from "components/button";
import { useNavigate } from "react-router-dom";
const CheckoutAddress = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    // getValues,
    // formState: {},
  } = useForm({
    mode: "onChange",
  });
  const checkout = async (values) => {
    await console.log(values);
    navigate("/payment");
  };
  // console.log(getValues("city"), getValues("districts"), getValues("ward"));
  const [disctrict, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  return (
    <>
      <form
        className="w-full mt-4 flex gap-4"
        onSubmit={handleSubmit(checkout)}
      >
        <div className="w-1/2 flex flex-col gap-y-4 pb-2 px-2 shadow-md">
          <div className="w-full p-2 bg-green-400 text-center text-white">
            Thông tin khách hàng
          </div>
          <input
            type="text"
            className="w-full h-10 border border-[#ccc] rounded-md p-2 outline-none"
            {...register("username")}
            placeholder="Tên khách hàng"
          />
          <input
            type="text"
            className="w-full h-10 border border-[#ccc] rounded-md p-2 outline-none"
            {...register("phone")}
            placeholder="Số điện thoại"
          />
          <input
            type="text"
            className="w-full h-10 border border-[#ccc] rounded-md p-2 outline-none"
            {...register("email")}
            placeholder="Email"
          />
          <input
            name="address"
            {...register("address")}
            placeholder="Địa chỉ"
            className="w-full border border-[#ccc] p-2 outline-none h-[40px]"
          ></input>
        </div>
        <div className="flex w-1/2 flex-col gap-y-4 shadow-md pb-2 px-2">
          <div className="w-full p-2 bg-green-400 text-center text-white">
            Địa chỉ đơn hàng
          </div>
          <select
            name="city"
            id=""
            className="w-full border border-[#ccc] rounded-md p-2 h-10"
            {...register("city")}
            onChange={(e) => {
              console.log(e.target.value);
              const city = Data.filter((item) => item.Name === e.target.value);
              // console.log(city);
              setDistrict(city[0].Districts);
            }}
          >
            <option value="">City</option>
            {Data.map((item, index) => (
              <option value={item.value}>{item.Name}</option>
            ))}
          </select>
          <select
            name=""
            id=""
            {...register("districts")}
            className="w-full border border-[#ccc] rounded-md p-2 h-10"
            onChange={(e) => {
              const districts = disctrict.filter(
                (item) => item.Name === e.target.value
              );
              setWard(districts[0].Wards);
            }}
          >
            <option value="">District</option>
            {disctrict.map((item, index) => (
              <option value={item.value}>{item.Name}</option>
            ))}
          </select>
          <select
            name=""
            id=""
            {...register("ward")}
            className="outline-none w-full  border border-[#ccc] rounded-md p-2 h-10"
          >
            <option value="">Ward</option>
            {ward.map((item, index) => (
              <option value={item.value}>{item.Name}</option>
            ))}
          </select>
          <Button>Tiếp tục</Button>
        </div>
      </form>
    </>
  );
};

export default CheckoutAddress;
