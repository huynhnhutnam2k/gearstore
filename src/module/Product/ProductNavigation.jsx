import React from "react";

const ProductNavigation = () => {
  return (
    <div className="w-1/4 flex -mt-[15px] flex-col gap-y-3 py-3">
      <div className="">
        <div className="text-xl mb-3 font-bold">Categories</div>
        <ul className="flex flex-col gap-y-2 text-lg cursor-pointer">
          <li>Wireless</li>
          <li>In-ear headphone</li>
          <li>Over-ear headphone</li>
          <li>sport headphone</li>
        </ul>
      </div>
      <div className="">
        <div className="text-xl mb-3 font-bold">Price</div>
        <div className="flex">
          <input
            type="text"
            className="w-1/3 border-2 border-black p-1 outline-none"
          />
          <div className="w-10 h-10 flex justify-center items-center">---</div>
          <input
            type="text"
            className="w-1/3 border-2 border-black p-1 outline-none"
          />
        </div>
        <div className="flex flex-col gap-y-2 text-lg cursor-pointer select-none">
          <div class="group-checkbox mt-3 mb-2">
            <input type="checkbox" id="status1" />
            <label for="status1">
              On sale
              <ion-icon name="checkmark-outline"></ion-icon>
            </label>
          </div>
          <div class="group-checkbox my-2">
            <input type="checkbox" id="status2" />
            <label for="status2">
              In stock
              <ion-icon name="checkmark-outline"></ion-icon>
            </label>
          </div>
          <div class="group-checkbox my-2">
            <input type="checkbox" id="status3" />
            <label for="status3">
              Featured
              <ion-icon name="checkmark-outline"></ion-icon>
            </label>
          </div>
        </div>
      </div>
      <div className="">
        <div className="text-xl font-bold ">Rating</div>
        <div className="flex flex-col gap-y-3">
          <div class="group-checkbox mt-3 mb-2">
            <input type="checkbox" id="remember1" />
            <label for="remember1">
              <span class="rating">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
              </span>
              <ion-icon name="checkmark-outline"></ion-icon>
            </label>
          </div>
          <div class="group-checkbox my-2">
            <input type="checkbox" id="remember2" />
            <label for="remember2">
              <span class="rating">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
              </span>
              <ion-icon name="checkmark-outline"></ion-icon>
            </label>
          </div>
          <div class="group-checkbox my-2">
            <input type="checkbox" id="remember3" />
            <label for="remember3">
              <span class="rating">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
              </span>
              <ion-icon name="checkmark-outline"></ion-icon>
            </label>
          </div>
          <div class="group-checkbox my-2">
            <input type="checkbox" id="remember4" />
            <label for="remember4">
              <span class="rating">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
              </span>
              <ion-icon name="checkmark-outline"></ion-icon>
            </label>
          </div>
          <div class="group-checkbox my-2">
            <input type="checkbox" id="remember5" />
            <label for="remember5">
              <span class="rating">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
              </span>
              <ion-icon name="checkmark-outline"></ion-icon>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNavigation;
