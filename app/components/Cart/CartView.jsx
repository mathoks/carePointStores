"use client";
import { useAppSelector } from "@/app/lib/hooks";
import React, { useMemo, useState, useTransition, useEffect } from "react";
import CartSummary from "./CartSummary";

export const fetchCartData = async () => {
  const response = await new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = [
        {
          img: "https://m.media-amazon.com/images/I/61mpEXbBXoL._AC_UF1000,1000_QL80_.jpg",
          price: 1500,
          quantity: 4,
          name: "Vitamin C 1000mg",
          variants: [
            {
              variant: "20ml",
              price: 399,
              quantity: 2,
            },
            {
              variant: "50ml",
              price: 899,
              quantity: 2,
            },
          ],
          name: "Vitamin D 500mg"
        },
        {
          img: "https://m.media-amazon.com/images/I/61mpEXbBXoL._AC_UF1000,1000_QL80_.jpg",
          price: 1500,
          quantity: 4,
          variant: [],
          name:"Vitamin Oil"
        },
      ];
      resolve(data);
    }, 1500);
  });
  return response;
};

const CartView = () => {
  const cart = useAppSelector((state) => state.userCart.data);
  console.log(cart)
  const initialOptimisticCart = useMemo(() => {
    if (cart.length > 0) {
      return [...cart];
    }
    return [];
  }, [cart]);

  const [optimisticCart, setOptimisticCart] = useState(initialOptimisticCart);
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(() => {
      setOptimisticCart((prevState) => [...prevState, ...cart]);
    });
    
  }, [cart]);
  
  if(optimisticCart.length === 0){
    return null
  }
  return (
    <div  className=" bg-neutral md:col-span-2 space-y-4 flex flex-col">
      <div className="flex justify-between bg-white text-slate-900 p-4 items-center rounded-sm">
      <h1 className="capitalize text-slate-900 font-bold">Your Products</h1>
      <span className="flex gap-2">
      <h1 className="text-sm font-bold text-slate-900">My Cart</h1> 
      <span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>
 </span>
       <span className="text-sm" >Checkout</span> 
      </span>
     
      </div>
      <CartSummary data={optimisticCart}/>
    </div>
  );
};

export default CartView;
