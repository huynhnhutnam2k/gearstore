import { Pro } from "components/product";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import LoadingSkeleton from "components/loading/loadingSkeleton";
import { getAllProduct } from "app/productSlice";
const HomeBestSelling = () => {
  const { products, loading } = useSelector((state) => state.product);
  const { isMobile } = useSelector((state) => state.stateDevide);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct(50));
  }, [dispatch]);

  return (
    <div className="my-20 container">
      <div className="text-center text-[50px] font-bold uppercase text-black ">
        Sản phẩm bán chạy
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
            {new Array(4).fill(0).map(() => (
              <LoadingSkeleton key={v4()}></LoadingSkeleton>
            ))}
          </div>
        )}
        {!loading &&
          products?.length > 0 &&
          products
            ?.slice()
            ?.sort((a, b) =>
              a.countInStock > b.countInStock
                ? 1
                : b.countInStock > a.countInStock
                ? -1
                : 0
            )
            ?.slice(0, 4)
            ?.map((item) => <Pro item={item}></Pro>)}
      </div>
    </div>
  );
};

export default HomeBestSelling;
