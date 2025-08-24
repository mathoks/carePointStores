"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import React, { useEffect, Suspense } from "react";
import CartSummary from "./CartSummary";
import { useQuery } from "@tanstack/react-query";
import { cartOptions } from "@/app/lib/queryClient/getCartQuery";
import { addToCart } from "@/app/lib/features/cart/cartSlice";

const CartView = ({userId})=>{
  const cart = useAppSelector((state) => state.userCart.data);
  const Total = useAppSelector((state) => state.userCart.subTotal);
  const dispatch = useAppDispatch()
  const { data = [], isSuccess} =
  useQuery(cartOptions(userId));
 
  useEffect(() => {
   
    if (!!data.length && isSuccess && userId !== "guest") {
          dispatch(addToCart(data))
        }
  
  }, [data, isSuccess, dispatch, userId])
  

//   const [optimisticCart, setOptimisticCart] = useState(initialOptimisticCart);
//   const [isPending, startTransition] = useTransition()

//   useEffect(() => {
//     startTransition(() => {
//       setOptimisticCart((prevState) => [...prevState, ...cart]);
//     });
    
//   }, [cart]);
  
  if(cart.length === 0){
    return null
  }
  return (
     <Suspense fallback={<div>loading....</div>}>
    <div  className=" md:col-span-4 space-y-4 flex flex-col relative h-fit">
      <div className="flex justify-between bg-schemes-light-surface  text-slate-900 p-4 items-center rounded-sm">
      <h1 className="capitalize text-slate-900 font-bold ">Your Products</h1>
      <span className="flex gap-2">
      <h1 className="text-sm font-bold text-schemes-light-onPrimaryContainer ">My Cart</h1> 
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>
       <span className="text-sm text-schemes-light-outline" >Checkout</span> 
      </span>
     
      </div>
      <CartSummary data={cart} Total= {Total}/>
      
    </div>
    </Suspense>
  );
};

export default CartView;
