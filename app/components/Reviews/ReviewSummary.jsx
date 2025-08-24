import React, { memo, Suspense, useEffect, useState } from "react";
import getReviewsSumm from "@/app/actions/users/getReviewsSumm";
import Stars from "@/app/util/Stars";
import ProgressBar from "@/app/util/ProgressBar";
import { useFetchProdReviewSumm } from "@/app/lib/hooks";

/**
 * Renders a list of progress bars based on the provided data.
 *
 * @param {object} props - Component props.
 * @param {number[]} props.list - An array of numbers representing the review distribution for each rating.
 *
 * @returns {JSX.Element} A JSX element containing the list of progress bars.
 */
const ProgressBars = memo(function Ratingss({ list }) {
  console.log(list, "list of ratings");
  return list.map((num, id) => {
    return (
      <li key={id} className="">
        <span className="flex items-center font-medium space-x-2">
          <p className="text-[12px]">{id + 1}</p>
          <p className="w-full">
            <ProgressBar value={num} h={10} />
          </p>
        </span>
      </li>
    );
  });
});

/**
 * Displays a review summary for a product, including average rating, total reviews, and review distribution.
 *
 * @param {object} props - Component props.
 * @param {string} props.product - The product ID or identifier.
 *
 * @returns {JSX.Element} A JSX element containing the review summary.
 */
const Reviewsummary = memo(function Summ({ product }) {
  const { data: reviewsSummary } = useFetchProdReviewSumm(product);

  const { average_rating, total_reviews, prod_id, ...rest } = reviewsSummary;

  return (
    average_rating && <div className="grid grid-cols-3  gap-x-0  -ml-5 w-[calc(100%-8px)]">
      <div className="flex col-span-1 flex-col text-[12px] items-center ">
        <Stars
          rating={Number(average_rating.toFixed(1))}
          size={"font-semibold text-4xl "}
          size1={"flex-col"}
        />
        <p className="">{total_reviews}</p>
      </div>
      <ul className="w-full flex flex-col-reverse col-span-2">
        <Suspense fallback={"...loading"}>
          <ProgressBars list={Object.values(rest).reverse()} />
        </Suspense>
      </ul>
    </div>
  );
});

export default Reviewsummary;
