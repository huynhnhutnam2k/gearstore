import { Pro } from "components/product";
import React from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import LoadingSkeleton from "components/loading/loadingSkeleton";
const HomeBestSelling = () => {
  const { products, loading } = useSelector((state) => state.product);
  const { isMobile } = useSelector((state) => state.stateDevide);
  return (
    <div className="my-20 container">
      <div className="text-center text-[50px] font-bold uppercase text-black ">
        Best selling
      </div>
      <div
        className={`overflow-hidden grid ${
          isMobile ? "grid-cols-2" : "grid-cols-4"
        } gap-2`}
      >
        {loading && (
          <div
            className={` grid ${
              isMobile ? "grid-cols-2" : "grid-cols-4"
            } gap-2`}
          >
            {new Array(10).fill(0).map(() => (
              <LoadingSkeleton key={v4()}></LoadingSkeleton>
            ))}
          </div>
        )}
        {!loading &&
          products.length > 0 &&
          products.map((item) => <Pro item={item}></Pro>)}
      </div>
    </div>
  );
};

export default HomeBestSelling;
