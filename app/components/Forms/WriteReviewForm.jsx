"use client";

import React, { memo } from "react";
import { is } from "immutable";
import { useSession } from "next-auth/react";
import { useAddReview, useAppSelector } from "@/app/lib/hooks";
import StarIcon from "@/public/icons/StarIcon";
import { nanoid } from "@reduxjs/toolkit";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productOptions } from "@/app/lib/queryClient/productQueryOptions";

const WriteReviewForm = memo(function RForm({ id }) {
  const ReviewState = useAppSelector((state) => state.review.showBox);
  const user = useSession();
  const {
    data: { categoryId },
  } = useSuspenseQuery(productOptions(id));
  const { mutate, isPending } = useAddReview(
    id,
    categoryId,
    user?.data?.user?.id
  );

  const handlechange = (e) => {
    const { value } = e.target;
    if (value.length > 2) {
      e.target.nextSibling.style.visibility = "visible";
      e.target.nextSibling.innerText = `${value.length}/200`;
      if (value.length > 200) {
        e.target.nextSibling.style.color = "red";
      } else {
        e.target.nextSibling.style.color = "black";
      }
    } else {
      e.target.nextSibling.style.visibility = "invisible";
      e.target.nextSibling.innerText = "";
    }
  };

  const dispatComment = (formData) => {
    const review = formData.get("review");
    const rating = formData.get("rating");
    const category_id = formData.get("category");
    const prod_id = formData.get("product");
    const data = {
      comment: review,
      review: Number(rating),
      createdat: Date.now(),
      prod_id,
      id: nanoid(8),
      category_id: Number(category_id),
      user: {
        email: user?.data?.user?.email,
        image: user?.data?.user?.image,
        id: user?.data?.user?.id,
      },
    };
    mutate(data);
  };

  return (
    <div
      id="reviewForm"
      className={` grid place-items-center grid-cols-1 md:px-4 lg:px-24 rounded-sm justify-center items-center p-2  shadow-sm ${
        ReviewState ? "visible" : "invisible h-0"
      }`}
    >
      <form className="space-y-8 size-full" id="revForm" action={dispatComment}>
        <div className="">
          <div className="flex space-x-2">
            <div className="space-y-2">
              <p className="font-meduim  capitalize">
                {user?.data?.user?.email.split("@")[0]}
              </p>
              <p>Reviews are public and include your account information</p>
            </div>
          </div>
        </div>
        <div className="ratings  space-x-4">
          <input
            type="radio"
            name="rating"
            id="star5"
            // onChange={() => setActive(false)}
            value={5}
            className="sr-only"
          />
          <label htmlFor="star5">
            <StarIcon size={"size-6"} />
          </label>
          <input
            type="radio"
            name="rating"
            value={4}
            // onChange={() => setActive(false)}
            id="star4"
            className="sr-only"
          />
          <label htmlFor="star4">
            <StarIcon size={"size-6"} />
          </label>
          <input
            type="radio"
            value={3}
            // onChange={() => setActive(false)}
            name="rating"
            id="star3"
            className="sr-only"
          />
          <label htmlFor="star3">
            <StarIcon size={"size-6"} />
          </label>
          <input
            type="radio"
            name="rating"
            value={2}
            // onChange={() => setActive(false)}
            id="star2"
            className="sr-only"
          />
          <label htmlFor="star2">
            <StarIcon size={"size-6"} />
          </label>
          <input
            type="radio"
            value={1}
            name="rating"
            // onChange={() => setActive(false)}
            id="star1"
            className="sr-only"
          />
          <label htmlFor="star1">
            <StarIcon size={"size-6"} />
          </label>
        </div>
        <div className="space-y-1">
          <textarea
            minLength={2}
            maxLength={200}
            id="text-rev"
            placeholder="Describe your experience here....(Optional)"
            onChange={handlechange}
            rows={4}
            name="review"
            autoFocus
            className=" bg-white rounded-t-sm  p-2 w-[100%] box-border ring-1"
          />
          <pre className="text-[11px]"></pre>
        </div>
        <input name="product" defaultValue={id} className="sr-only " />
        <input name="category" defaultValue={categoryId} className="sr-only " />
        <span className="flex justify-end">
          <button
            disabled={isPending}
            className="ring-1 px-2.5 py-1 text-blue-400 rounded-full disabled:opacity-50 shadow-md"
          >
            submit
          </button>
        </span>
      </form>
    </div>
  );
});

export default memo(WriteReviewForm, (prev, next) => is(prev.id, next.id));
