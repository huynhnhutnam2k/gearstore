import { Rating } from "components/rating";
import React from "react";

const Review = () => {
  return (
    <div className="flex flex-col w-full">
      <ItemReview></ItemReview>
    </div>
  );
};

const ItemReview = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-5">
        <div className="font-bold">Name</div>
        <div className="">
          <Rating value={3}></Rating>
        </div>
      </div>
      <div className="">Comment</div>
      <div className="flex gap-5">
        <div className="">
          <span>
            <ion-icon name="heart-outline"></ion-icon>
          </span>
          Thích
        </div>
        <div className="">
          <span>
            <ion-icon name="chatbubble-outline"></ion-icon>
          </span>
          Thảo luận
        </div>
        <div className="">Time</div>
      </div>
    </div>
  );
};
export default Review;
