"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
import Products from "./Products";
import { AllproductOptions } from "../lib/queryClient/productQueryOptions";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
// import VariantDrawer from "./bottons/VariantDrawer";
import { useSession } from "next-auth/react";
import { useGSAP } from "@gsap/react";
import { useInView } from "react-intersection-observer";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { setIsLoadingCart } from "../lib/features/cart/cartSlice";

const DrawerComponent = dynamic(() => import("./bottons/VariantDrawer"));
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);
const ProductWindow = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const query = searchParams.get("category") ?? "All-categories";

  const isLoadingCart = useAppSelector((state) => state.userCart.isLoadingCart);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useSuspenseInfiniteQuery(AllproductOptions({query}));
  const { data: userData } = useSession();
  const { ref, inView } = useInView();

  
  useEffect(() => {
    refetch({query})
    if(data){
      dispatch(setIsLoadingCart(false))
    }
  }, [query])
  
  // useEffect(() => {
  //   if(inView){
  //     fetchNextPage()
  //     if(isFetchingNextPage){
  //       document.body.classList.add('no-scroll');
  //     }  else {
  //       document.body.classList.remove('no-scroll');
  //    }
  //   }
  //   ScrollTrigger.refresh();
  // }, [fetchNextPage, inView, isFetchingNextPage])

  //  useGSAP (()=> {
  //   return ScrollTrigger.create({
  //     trigger: document.body,
  //     start: "top 90%",
  //     end: "bottom bottom",
  //     markers: true,
  //     onUpdate: (self) => {
  //         let progress = self.progress.toFixed(2);
  //         console.log(progress);
  //         if (progress >= 0.6  && self.direction === 1) {
  //             if(!isFetchingNextPage && hasNextPage){

  //               fetchNextPage();

  //             }  if(isFetchingNextPage){
  //               document.body.classList.add('no-scroll');
  //             }
  //               else {
  //                document.body.classList.remove('no-scroll');
  //             }
  //             ScrollTrigger.refresh();
  //         }
  //     },
  // })},[]);

  return (
    <Suspense fallback={<div>loading....</div>}>
      <div className="grid grid-flow-row grid-cols-1 gap-2 text-base">
        <h2 className="pl-2 font-semibold products relative inline-block">
          Products
        </h2>
        <div
          id={"datavi"}
          className="grid  grid-cols-2 lg:grid-cols-3 items-center md:gap-x-4  p-2 pb-10 gap-x-2 gap-y-1 sm:p-20"
        >
          {data?.pages?.map((pages, id) => (
            <React.Fragment key={id}>
              {!isLoadingCart &&
                pages?.map((page, ids) => (
                  <Products key={page?.id || ids} info={page} style={"pb-4"} />
                ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div id="loader"  className=" p-4 flex justify-center">
        <button
          className="btn-outline ring-1 px-2.5 rounded-full py-1.5"
          onClick={fetchNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load Newer..."
            : "Nothing more to load..."}
        </button>
      </div>
      <DrawerComponent userId={userData?.user?.id} />
    </Suspense>
  );
};

export default ProductWindow;
