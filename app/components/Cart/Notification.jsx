"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { cartOptions } from "@/app/lib/queryClient/getCartQuery";
import { useQuery } from "@tanstack/react-query";
import React, { memo, useEffect } from "react";
import { addToCart, setIsLoadingCart } from "@/app/lib/features/cart/cartSlice";
import { useSession } from "next-auth/react";

const  Notification = ({id})=>{
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.userCart.data) ?? 0;
  const { data, isFetching, isError, isSuccess, error, isPending } = useQuery(
    cartOptions(id)
  );

  useEffect(() => {
    if (isFetching && isPending) dispatch(setIsLoadingCart(true));
    if (isSuccess && !!data) {
      if (Array.isArray(data)) {
        dispatch(addToCart(data));
      }
      dispatch(setIsLoadingCart(false));
    } else {
      dispatch(addToCart([]));
    }
  }, [data, isSuccess, isFetching, isPending]);

  if (isSuccess || data)
    return (
      <span className="badge badge-sm indicator-item bg-schemes-light-primaryContainer text-schemes-light-onPrimaryContainer ">
        {items?.length}
      </span>
    );
  if (isError)
    return (
      <span
        className={`badge badge-sm indicator-item ${
          isError ? "hidden" : "inherit"
        }`}
      >
        {items?.length}
      </span>
    );
};

export default Notification;
