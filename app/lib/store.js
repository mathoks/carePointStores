import { configureStore } from "@reduxjs/toolkit";
import userCartSlice from "@/app/lib/features/cart/cartSlice"
import ReviewSlice from "@/app/lib/features/Reviews/ReviewSlice"
import ModalSlice from "@/app/lib/features/Modal/ModalSlice"
import searchSlice from "@/app/lib/features/search/searchSlice"
import ArgsSlice from "@/app/lib/features/product/argSlice"
import settingsSlice from "@/app/lib/features/settings/settingsSlice"
import ShippingSlice from "@/app/lib/features/settings/ShippingSlice"
export const makeStore = () => {
  return configureStore({
    reducer: {
      userCart: userCartSlice,
      review: ReviewSlice,
      modal: ModalSlice,
      product: ArgsSlice,
      search: searchSlice,
      settings: settingsSlice,
      shipping: ShippingSlice
    },
    middleware:(getDefaultMiddleware)=>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};
