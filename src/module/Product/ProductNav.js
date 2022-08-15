import React from "react";
import KeyBoard from "asset/image/keyboard.png";
import Mouse from "asset/image/mouse.png";
import priceFilter from "constant/filterPrice";
import { useDispatch, useSelector } from "react-redux";
import { newFilterPrice } from "components/search/searchSlice";
const ProductNav = () => {
  // const [checkedPrice, setCheckedPrice] = useState(null);
  const { filterPrice } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const handleFilterPrice = (value) => {
    const payload = {
      from: value.from,
      to: value?.to,
    };
    dispatch(newFilterPrice(payload));
  };
  return (
    <div className="w-full max-w-[20%] h-full">
      <div className="flex flex-col">
        <div className="font-bold text-[25px] pb-2 border-b border-b-[#ccc]">
          Popular
        </div>
        <div className="flex flex-col gap-y-2 mt-1">
          <div className="flex gap-x-5 w-full items-center rounded-md cursor-pointer duration-150 hover:bg-green-300 p-2">
            <span>
              <img
                src={KeyBoard}
                alt=""
                className="max-h-[30px] flex-shrink-0"
              />
            </span>
            <p className="flex-1">Keyboard</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 mt-1">
          <div className="flex gap-x-5 w-full items-center rounded-md cursor-pointer duration-150 hover:bg-green-300 p-2">
            <span>
              <img src={Mouse} alt="" className="max-h-[30px] flex-shrink-0" />
            </span>
            <p className="flex-1">Mouse</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="font-bold text-[25px] pb-2 border-b border-b-[#ccc]">
          Price
        </div>
        {priceFilter.map((item) => (
          <div className="w-full gap-y-2 mt-2" key={item.id}>
            <div className="flex gap-x-2 h-[30px] items-center">
              <input
                type="radio"
                name="priceFilter"
                // value={item.value}
                checked={item.from === filterPrice?.from}
                onChange={() => handleFilterPrice(item)}
                id={item.label}
              />
              <label htmlFor={item.label} className="flex h-full items-center">
                {item.label}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductNav;
