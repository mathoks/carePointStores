"use client";

import { is } from "immutable"; // Assuming you're using Immutable.js for state management
import React, {
  useMemo,
  useEffect,
  useState,
  memo,
  startTransition,
} from "react"; // Use useState instead of useOptimistic

import HomeMore from "../bottons/HomeMore";
import ReviewModal from "../Modal/ReviewModal";
import Stars from "@/app/util/Stars";
import Reviewsummary from "./ReviewSummary";
import {
  useAddReviewReaction,
  useAppSelector,
  useFetchReviews,
} from "@/app/lib/hooks";
import { useSession } from "next-auth/react";
import Reaction from "./Reaction";

const Reviews = memo(
  function Rx(props) {
    const user = useSession();
    const user_id = user?.data?.user.id;
    const [curReview, setcurReview] = useState(null);
    const { comment: comments, prod, storeId, category_id } = props;
    const { mutate } = useAddReviewReaction(
      prod,
      category_id,
      user_id,
      curReview
    );
    const { data, isFetching, isFetchingNextPage } = useFetchReviews(
      category_id,
      prod,
      props.comment
    );
    const comment = useAppSelector((state) => state.review.comment);
    const [push, setPush] = useState(false);
    

    const initialOptimisticReviews = useMemo(() => {
      if (data?.pages?.length > 0) {
        const nonNullArrays = data.pages.filter((p) => p.length > 0);
        return [...nonNullArrays];
      }
      return [];
    }, [data?.pages]);

    const [optimisticReviews, setOptimisticReviews] = useState(
      initialOptimisticReviews
    );

    console.log(data?.pages.filter((p) => p.length));
    const FormattedDate = memo(function My({ timestamp }) {
      const date = new Date(timestamp);
      return (
        <time className=" text-slate-700 text-sm">{`${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`}</time>
      );
    });

    const toggleClass = (e) => {
      const { classList } = e.target;
      classList.toggle("line-clamp-none");
    };

    const pushReaction = async (e) => {
      const {
        dataset: { val },
        innerText,
      } = e.target;
      setcurReview(val);
      setPush(true);
      try {
        mutate(innerText);
      } catch (error) {
        console.log(error);
        console.log("failed");
      } finally {
        setPush(false);
      }
    };

    // useEffect(() => {

    //   if(data?.pages?.length > 0)
    //   startTransition(() => {
    //     setInitial(
    //            [...data?.pages]
    //           );
    //         });

    // }, [data?.pages])

    useEffect(() => {
      const nonNullArrays = data?.pages?.filter((p) => p.length);
      if (nonNullArrays?.length > 0) {
        startTransition(() => {
          setOptimisticReviews([...nonNullArrays]);
        });
        
      } 
      else  startTransition(() => {
        setOptimisticReviews([...nonNullArrays]);
      });
    }, [data?.pages]); // Only update on comment change

    console.log(optimisticReviews);
    return optimisticReviews.length < 1 ? (
      <p className="p-2">No Reviews yet be the first to drop a review</p>
    ) : (
      <div className="space-y-4 flex-grow">
        <p className="px-2">What People are saying about this Product</p>
        <Reviewsummary product={prod} prevRate={comment?.review || 0} />
        <ul className="px-4 space-y-2 grid grid-cols-1 gap-4 md:grid-cols-1">
          {optimisticReviews?.map((pages = [], i) => {
            console.log(pages);
            return (
              <React.Fragment key={i}>
                {pages?.map(({ createdat, comment, id, review, user }, idx) => (
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

                    <Reaction
                      reactions={comments?.reactions}
                      buttonProps={{
                        id,
                        push,
                        pushReaction,
                        prod,
                        category_id,
                        user_id,
                      }}
                    />

                    <ReviewModal
                      flag={{ tag: "Flag as inappropriate" }}
                      flag2={{ tag: "Flag as spam" }}
                      comment={storeId ? { tag: "Comment" } : ""}
                      value={createdat}
                    />
                  </li>
                ))}
              </React.Fragment>
            );
          })}
        </ul>

        <p className=" text-blue-500 font-medium px-4">See all reviews</p>
      </div>
    );
  },
  (prevProps, nextProps) => is(prevProps.comment, nextProps.comment)
); // Memoization based on reviews

export default Reviews;
