import { Rating } from "components/rating";
import React from "react";
import moment from "moment";
const Review = ({ reviews }) => {
  return (
    <div className="flex flex-col w-full px-32 gap-y-1">
      {reviews?.map((review) => (
        <ItemReview review={review}></ItemReview>
      ))}
    </div>
  );
};

const ItemReview = ({ review }) => {
  return (
    <div className="flex flex-col border-green-400 border-b-2  px-16 py-4 rounded-lg">
      <div className="flex w-full justify-between h-16 items-center">
        <div className="flex gap-x-1">
          <div className="h-16 w-16">
            <img
              src={review.avatar}
              alt=""
              className="max-h-14 w-14 object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col py-1 justify-center">
            <div className="font-bold capitalize">{review?.name}</div>
            <div className="">{moment(review.createdAt).format("llll")}</div>
          </div>
        </div>
        <div className="">
          <Rating value={review?.rating}></Rating>
        </div>
      </div>
      <div className="capitalize px-4">{review.comment}</div>
    </div>
  );
};
export default Review;
