"use client";
import React, { useEffect, useState, memo, Suspense } from "react"; // Use useState instead of useOptimistic
import { useAppDispatch, useFetchReview } from "@/app/lib/hooks";
import {
  setCompleted,
  setRevBox,
} from "@/app/lib/features/Reviews/ReviewSlice";
import { Avatar } from "@/public/Avatar/Avatar";
import Stars from "@/app/util/Stars";
import ReviewModal from "../Modal/ReviewModal";
import HomeMore from "../bottons/HomeMore";
import DeleteIcon from "@/public/icons/DeleteIcon";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productOptions } from "@/app/lib/queryClient/productQueryOptions";

const ReviewCard = memo(function NewEntry({ prod_comment, user }) {
  const dispatch = useAppDispatch();
  const handleDispatch = () => {
    dispatch(setRevBox(true));
    setTimeout(() => {
      const Element = document
        .getElementById("reviewForm")
        .getBoundingClientRect().bottom;
      window.scrollTo({ top: Element, behavior: "smooth" });
    }, 500);
  };
  const { comment, createdat, review, id, prod_id, user_id, category_id } =
    prod_comment;

  const FormattedDate = memo(function My({ timestamp }) {
    const date = new Date(timestamp);
    return (
      <p className=" text-slate-700 text-sm">{`${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`}</p>
    );
  });
  const toggleClass = (e) => {
    const { classList } = e.target;
    classList.toggle("line-clamp-none");
  };
  return (
    <Suspense fallback={<div>loading....</div>}>
      <div className="space-y-4 p-2">
        <p className="px-1 products relative inline-block font-medium">
          Your review
        </p>

        <ul className="px-4 space-y-2 grid grid-cols-1 gap-4 md:grid-cols-1">
          <li className=" py-2  space-y-4 relative">
            <span className="flex justify-between items-start">
              <span className="flex space-x-2">
                <div className="mt-1">
                  <Avatar src={user?.image} />
                </div>
                <span className="space-y-1">
                  <p className="line-clamp-1 font-medium first-letter:capitalize">
                    {user?.email.split("@")[0]}
                  </p>
                  <span className="flex space-x-4">
                    <Stars rating={review} />
                    <FormattedDate timestamp={createdat} />
                  </span>
                </span>
              </span>
              <HomeMore id={id} />
            </span>
            <p onClick={toggleClass} className="line-clamp-2">
              {comment}
            </p>

            <button
              onClick={handleDispatch}
              className="font-medium text-blue-500 btn bg-inherit border-none p-0 shadow-none"
            >
              Edit your review
            </button>
            <ReviewModal
              Delete={{ tag: "Delete", icon: <DeleteIcon /> }}
              value={id}
              reviewData={{ category_id, user_id, prod_id }}
            />
          </li>
        </ul>
      </div>
    </Suspense>
  );
});
const UserReview = ({ id, user_id }) => {
  const { data } = useSuspenseQuery(productOptions(id));
  // const [userComment, updateUserComment] = useState({});

  const dispatch = useAppDispatch();
  const {
    data: userReview,
    isLoading,
    error,
  } = useFetchReview(id, data.categoryId, user_id?.id);

  useEffect(() => {
    if (!isLoading && Object.keys(userReview).length > 0) {
      // updateUserComment(userReview)
      dispatch(setCompleted(true));
    } else {
      // updateUserComment({});
      dispatch(setCompleted(false));
    }
  }, [userReview]); // Only update on comment change

  if (isLoading) return <p className="text-center ">loading....</p>;
  if (error) return <p>could not load your review</p>;
  return Object.keys(userReview)?.length === 0 ? null : (
    <ReviewCard prod_comment={userReview} user={user_id} />
  );
};
// (prevProps, nextProps) => is(prevProps.prod, nextProps.prod)
// ); // Memoization based on reviews

export default UserReview;
