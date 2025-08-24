"use client";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { setIsSuccessMessage } from "../lib/features/cart/cartSlice";

const notify = (message) => toast(message, );

const toastOptions = {
    success: {
        style: {
            background: 'green'
        }
    }
}
const FeedBack = () => {
  const message = useAppSelector((state) => state.userCart.isSuccessMessage);
  const dispatch = useAppDispatch();
   
  useEffect(() => {
    if (message !== "") {
      notify(message);
    }
    
    return () => {
       dispatch(setIsSuccessMessage(""));
      if (message) {
        notify(message);
      }
    };
  }, [message]);

  return <Toaster toastOptions={toastOptions}/>;
};

export default FeedBack;
