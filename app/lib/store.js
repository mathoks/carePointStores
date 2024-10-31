import { configureStore } from "@reduxjs/toolkit";
import userCartSlice from "@/app/lib/features/cart/cartSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      userCart: userCartSlice,
    //   review: ReviewSlice
    },
  });
};
