import { getAllCategories } from "app/categorySlice";
import { Rating } from "components/rating";
import { filters, rating } from "constant/filter";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductNavigation = (props) => {
  const {
    minVal,
    setMinVal,
    maxVal,
    setMaxVal,
    category,
    setCategory,
    star,
    setStar,
    filter,
    setFilter,
    setShowNav,
    isMobile,
  } = props;
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={`${
        isMobile
          ? "w-full p-4 relative bg-white shadow-lg top-[200x] z-10 h-max "
          : "w-1/4 "
      }flex -mt-[15px] flex-col gap-y-3 py-3`}
    >
      <div className="">
        {isMobile && (
          <div
            className="w-[120px]  bg-[#000] text-[#fff] border-2 border-black hover:text-[#000] hover:bg-[#fff] duration-200 uppercase p-2 text-center mb-2 cursor-pointer"
            onClick={() => setShowNav(false)}
          >
            Đóng
          </div>
        )}
        <div className="text-xl mb-3 font-bold">Danh mục </div>
        <ul className="flex flex-col gap-y-2 text-lg cursor-pointer">
          <li
            className={`${category === "" ? "text-blue-500" : ""}`}
            onClick={() => setCategory("")}
          >
            All
          </li>
          {categories?.map((item) => (
            <li
              className={`${category === item.name ? "text-blue-500" : ""}`}
              onClick={() => setCategory(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <div className="text-xl mb-3 font-bold">Giá</div>
        <div className="flex">
          <input
            type="number"
            className="w-1/3 border-2 border-black p-1 outline-none"
            value={minVal}
            onChange={(e) => setMinVal(+e.target.value)}
          />
          <div className="w-10 h-10 flex justify-center items-center">---</div>
          <input
            type="number"
            className="w-1/3 border-2 border-black p-1 outline-none"
            value={maxVal}
            onChange={(e) => setMaxVal(+e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-2 text-lg cursor-pointer select-none">
          {filters.map((item) => (
            <div class="group-checkbox mt-3 mb-2">
              <input
                type="checkbox"
                id={item.name}
                onChange={() => {
                  setFilter((prev) => {
                    if (prev.includes(item)) {
                      const newArr = filter.filter((i) => i !== item);
                      return newArr;
                    } else {
                      return [...prev, item];
                    }
                  });
                }}
              />
              <label for={item.name}>
                {item.name}
                <ion-icon name="checkmark-outline"></ion-icon>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <div className="text-xl font-bold ">Rate</div>
        <div className="flex flex-col gap-y-3">
          {rating.map((item) => (
            <div class="group-checkbox mt-3 mb-2">
              <input
                type="checkbox"
                id={`remember${item}`}
                onChange={() => {
                  setStar((prev) => {
                    if (prev.includes(item)) {
                      const newArr = star.filter((i) => i !== item);
                      return newArr;
                    } else {
                      return [...prev, item];
                    }
                  });
                }}
              />
              <label for={`remember${item}`}>
                <Rating value={item}></Rating>
                <ion-icon name="checkmark-outline"></ion-icon>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductNavigation;
