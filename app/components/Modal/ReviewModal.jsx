"use client";
import { setCompleted } from "@/app/lib/features/Reviews/ReviewSlice";
import { useAppDispatch, useAppSelector, useDeletReview} from "@/app/lib/hooks";
import React, { memo, useEffect, useState } from "react";

/**
 *
 * @param {*} props
 * @returns {React.JSX}
 */
const ReviewModal = memo(function Modals(props = {}) {
  const open = useAppSelector((state) => state.modal.show);
  const [child, setchild] = useState("");
  const {data, mutate, isPending, isSuccess, isError} = useDeletReview(props['reviewData'])
  const dispatch = useAppDispatch()
  
  const handleOpen = (e) => {
    e.stopPropagation()

    if(e.target.innerText === 'Delete'){
      // dispatch(setCompleted(false))
      mutate(props['value']);
    }
      
    
  };

  // useEffect(() =>{
  //   if(isError)
  //     dispatch(setCompleted(false));
  // }, [isError])
  
  useEffect(() => {
    let modalEl = Object.keys(props).map((tile, id) => {
      if (tile.toString() !== "value")
        return (
          <button key={id} value={id} onClick = {handleOpen} disabled={isPending}>
            {tile.toString() === "call" ? (
              <a href={`tel:${props.phone}`}>
                {" "}
                
                 
                  <span>{props[tile.toString()].tag}</span>{" "}
                  <span>{props[tile.toString()].icon}</span>
               
              </a>
            ) : ( 
              <span className="flex  justify-start space-x-2 text-[#4f08ed] text-nowrap w-full">
                <span>{props[tile.toString()].tag}</span>
                <span>{props[tile.toString()].icon}</span>
              </span>
            )}
          </button>
        );
    });
    setchild(modalEl);

    return () => {
      setchild(" ");
    };
  }, []);

  
  return (
    <div
      className={`absolute flex flex-col opacity-0 shadow-md z-30 bg-schemes-light-primaryContainer  top-8 right-4 p-4 ${
        open === props["value"]
          ? "inline-block opacity-100 transition-opacity"
          : "hidden"
      }`}
      key={props["value"]}
      id={props["value"]}
    >
      <ul className="menu px-0 mx-auto rounded-box w-fit" >
        {child}
      </ul>
    </div>
  );
});

export default ReviewModal;
