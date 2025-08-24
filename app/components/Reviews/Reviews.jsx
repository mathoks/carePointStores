"use client";

import React, {
  useMemo,
  memo,
} from "react"; // Use useState instead of useOptimistic

import HomeMore from "../bottons/HomeMore";
import ReviewModal from "../Modal/ReviewModal";
import Stars from "@/app/util/Stars";
import Reviewsummary from "./ReviewSummary";
import { useAddReviewReaction } from "@/app/lib/hooks";
import { useSession } from "next-auth/react";
import Reaction from "./Reaction";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { productOptions } from "@/app/lib/queryClient/productQueryOptions";


const fetchReviewsReaction = async (id, prod, category_id) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/products/${prod}/reviews-reactions?category_id=${category_id}&review_id=${id}`,
    { "Access-Control-Allow-Origin": "http://localhost:3001/" }
  );
  return await response.json();
};

const createQuery =(id, prod, category_id, reactions)=>({
  queryKey: ["reaction", id],
  queryFn: () => fetchReviewsReaction(id, prod, category_id),
  initialData: reactions,
});

const FormattedDate = memo(function My({ timestamp }) {
  const date = new Date(timestamp);
  return (
    <time className=" text-slate-700 text-sm">{`${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`}</time>
  );
});

const Reviews = memo(
  function Rx({ id }) {
    const { data } = useSuspenseQuery(productOptions(id));
    const user = useSession();
    const user_id = user?.data?.user.id;
    const { prod_reviews: comments, categoryId } = data;
    const { mutate, isPending } = useAddReviewReaction(id, categoryId, user_id);

    const OptimisticReviews = useMemo(() => {
      if (!!comments.length) {
        return [...comments];
      }
      return [];
    }, [comments]);

    const queries = OptimisticReviews.map(({id:reaction_id, reactions, user})=>createQuery(reaction_id, id, categoryId, reactions, user?.id));
    const results = useSuspenseQueries({queries});
    const toggleClass = (e) => {
      const { classList } = e.target;
      classList.toggle("line-clamp-none");
    };

    const pushReaction = async (e) => {
      const {
        dataset: { review_id},
        innerText,
      } = e.target;
     
      const variables = {
        innerText,
        review_id
      }
    
        try {
         mutate(variables)
      } catch (error) {
        console.log("failed");
      } finally {
        console.log("done");
      }
    };

    return !OptimisticReviews.length ? (
      <p className="p-2">No Reviews yet be the first to drop a review</p>
    ) : (
      <div className="space-y-4 flex-grow">
        <p className="px-2">What People are saying about this Product</p>
        <Reviewsummary product={id} />
        <ul className="px-4 space-y-2 grid grid-cols-1 gap-4 md:grid-cols-1">
          {OptimisticReviews?.map(
            (
              { createdat, comment, id: ids, review, user},
              idx
            ) => {
              let x = 0;
             
              if (idx < 3 && x !== 4) {
                const {data, isLoading, isPending: Pending} = results[idx];
              
                return (
                  <li className=" py-2  space-y-3 relative" key={idx}>
                    <span className="flex justify-between">
                      <span className="flex space-x-2 items-center">
                        <div className="w-10 rounded-full">
                          <img
                            src={
                              user?.image ??
                              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            }
                            alt="user Avatar"
                          />
                        </div>
                        <span className="space-y-1">
                          <p className="line-clamp-1 font-medium first-letter:capitalize">
                            {user?.email && user?.email.split("@")[0]}
                          </p>
                          <span className="flex space-x-4">
                            <Stars rating={review} />
                            <FormattedDate timestamp={createdat} />
                          </span>
                        </span>
                      </span>
                      <HomeMore id={createdat} />
                    </span>
                    <p onClick={toggleClass} className="line-clamp-2">
                      {comment}
                    </p>

                   { user_id && <Reaction
                      reactions={data}
                      buttonProps={{
                        hide: user_id === user.id,
                         ids,
                        push: Pending || isLoading || isPending,
                        pushReaction,
                        length: data?.filter(({reation_type})=> reation_type === 'YES').length,
                        hasReacted: data.find(({ reviewer_id, user_id:user_}) =>  reviewer_id === ids && user_ === user_id)?.reation_type
                      }}
                    /> }

                    <ReviewModal
                      flag={{ tag: "Flag as inappropriate" }}
                      flag2={{ tag: "Flag as spam" }}
                      comment={true ? { tag: "Comment" } : ""}
                      value={createdat}
                    />
                  </li>
                );
              } else if (idx === 3 && x !== 4) {
                x = 4;
                return (
                  <p key={idx} className=" text-blue-500 font-medium  text-end">
                    See all reviews
                  </p>
                );
              } else return null;
            }
          )}
        </ul>
      </div>
    );
  }
  // (prevProps, nextProps) => is(prevProps.comment, nextProps.comment)
); // Memoization based on reviews

export default Reviews;
