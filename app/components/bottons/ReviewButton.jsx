"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setRevBox,
  setOpenDialog,
  resetBox
} from "@/app/lib/features/Reviews/ReviewSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";

const ReviewButton = () => {
  const dispatch = useAppDispatch();
 
const ReviewState = useAppSelector((state) => state.review.showBox);
const DialogState = useAppSelector((state) => state.review.openDialog);
const completedState = useAppSelector((state) => state.review.completed);






  return (
    <div>
      <button
        onClick={() => {
          dispatch(setOpenDialog());
        }}
        className ={`text-blue-500 p-2 px-4 disabled:opacity-50 font-medium ${completedState ? "invisible" : "visible"}`}
        disabled={ReviewState}
      >
        Write a review
      </button>
      <dialog className="modal " open={DialogState} onClose={() => dispatch(setOpenDialog())}>
       
        <div className="modal-box bg-schemes-light-background">
        <div>Have you purchased this item?</div>
          <p>Please select an option:</p>
          <div className="flex space-x-4 modal-action">
            <button
              className=" btn bg-schemes-light-primary text-schemes-light-onPrimary "
              color="primary"
              onClick={() => {
                dispatch(setRevBox(true));
              }}
            >
              Yes
            </button>
            <button
              className="btn  bg-schemes-light-primary text-schemes-light-onPrimary"
              color="secondary"
              onClick={() => {
                dispatch(setOpenDialog());
              }}
            >
              No
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ReviewButton;
