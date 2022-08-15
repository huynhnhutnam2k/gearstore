import { Rating } from "components/rating";
import React from "react";
import { NavLink } from "react-router-dom";
const ProductFullsize = ({ product }) => {
  // const [product, setProduct] = useState({
  //   id: "",
  //   name: "",
  //   price: "",
  //   image: "",
  // });
  const handleWishList = (e) => {
    console.log(e);
  };
  const handleAddToCart = () => {};
  return (
    <div className="w-full h-[200px] hover:shadow-md flex relative product-full">
      <div className="w-[180px] h-[180px] flex-shrink-0 my-auto mx-2">
        <img
          src={`${product?.image[0]}`}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full h-full flex flex-col mt-2 gap-y-2 flex-1">
        <NavLink to={`/products/${product?._id}`} className="cursor-pointer">
          {product?.name}
        </NavLink>
        <p>{product?.price}</p>
        <Rating value={2}></Rating>
      </div>
      <div className="flex flex-col gap-y-5 absolute product-icon">
        <div
          className="flex justify-center items-center bg-rgba text-white w-10 h-10 rounded-full product-icon-first"
          onClick={() => handleWishList("dasd")}
        >
          <ion-icon name="star-outline"></ion-icon>
        </div>
        <div
          className="flex justify-center items-center bg-rgba text-white w-10 h-10 rounded-full  product-icon-second"
          onClick={handleAddToCart}
        >
          <ion-icon name="bag-add-outline"></ion-icon>
        </div>
      </div>
    </div>
  );
};

export default ProductFullsize;
