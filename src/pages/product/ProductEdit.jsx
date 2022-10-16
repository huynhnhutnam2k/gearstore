import React from "react";

const ProductEdit = () => {
  return (
    <div className="px-5">
      <div className="bg-purple-500 text-white w-[200px] p-2 relative before:content-[''] before:w-0 before:h-0 before:border-t-transparent before:border-t-[20px]  before:border-b-[20px] before:border-b-transparent before:border-l-[20px] before:border-l-purple-500 before:absolute before:-right-5 before:top-0 h-10 uppercase text-sm text-right flex justify-center items-center cursor-pointer">
        Edit products page
      </div>
      <form action="" className="my-2 overflow-auto flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name">Name product</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-black outline-none"
            id="name"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="price">Price product</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-black outline-none"
            id="price"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="price">Sale percent</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-black outline-none"
            id="price"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="countInStock">Count in stock </label>
          <input
            type="text"
            className="w-full p-2 border-2 border-black outline-none"
            id="countInStock"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name">Description product</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-black outline-none"
            id="name"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name">Category </label>
          <select
            name=""
            id=""
            className="w-full p-2 border-2 border-black outline-none"
          >
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
          </select>
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name">Image 1 </label>
          <input
            type="text"
            className="w-full p-2 border-2 border-black outline-none"
            id="name"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name">Image 2 </label>
          <input
            type="text"
            className="w-full p-2 border-2 border-black outline-none"
            id="name"
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

export default ProductEdit;
