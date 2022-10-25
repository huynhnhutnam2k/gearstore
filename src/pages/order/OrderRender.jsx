import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useOrderStore } from "../../store/order-store";

const OrderRender = () => {
  const { fetchAll, orders, status, setSort, search, setSearch, sort } =
    useOrderStore();
  const handleSearch = () => {};
  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between h-10 items-center">
          <div className="bg-purple-500 text-white w-[120px] p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer">
            List order
          </div>
        </div>
        <div className="flex gap-x-2 h-10 items-center justify-end">
          <div className="relative w-[300px] h-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full h-full p-2 border-2 border-black text-[#ccc] outline-none text-sm"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-1 w-10 h-10 text-2xl items-center flex justify-center text-black cursor-pointer "
              onClick={handleSearch}
            >
              <ion-icon name="search-circle-outline"></ion-icon>
            </div>
          </div>
          <select
            name=""
            id=""
            onChange={(e) => {
              setSort(e.target.value);
              fetchAll(sort);
            }}
            className="p-2 h-full border-2 border-black text-sm capitalize"
          >
            <option value="">Status</option>
            {status.map((item) => (
              <option value={item} className="capitalize">
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-y-3 ">
          {orders?.map((item, i) => (
            <div className="my-5" key={i}>
              <div className=" h-[200px] px-32 py-6 ">
                <div className="flex justify-between h-full border-b-2 border-b-slate-300">
                  <div className="flex gap-x-5 flex-1 capitalize">
                    <div className="flex flex-col justify-center gap-y-2 text-sm">
                      <div className="max-w-[100px] truncate">
                        {item?.user?.name}
                      </div>
                      <div className="">{item?.user?.phone}</div>
                      <div className="max-w-[100px] truncate">
                        {item?.user?.email}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-y-2 text-sm">
                      <div className="">
                        {item?.orderItems?.reduce((a, b) => a + b.qty, 0)} qty
                      </div>
                      <div className="">{item?.totalPrice} $</div>
                    </div>
                    <div className="flex flex-col justify-center gap-y-2 text-sm">
                      <div className="">{item?.orderItems?.length} items</div>
                      <div className="">{item?.status}</div>
                    </div>
                  </div>
                  <div className="h-full flex items-center gap-x-2 ">
                    <Link
                      to={`/orders/${item._id}`}
                      className="w-10 h-10 justify-center items-center flex cursor-pointer"
                    >
                      <ion-icon name="eye-outline"></ion-icon>
                    </Link>
                    <div className="flex justify-center items-center w-10 h-10 text-white rounded-full bg-slate-400 cursor-pointer">
                      <i className="bx bx-x"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderRender;
