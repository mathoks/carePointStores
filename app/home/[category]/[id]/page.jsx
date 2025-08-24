import Carousal2 from "@/app/components/Carusal2";
import DetailsIcon from "@/public/icons/DetailsIcon";
import SponsoredProducts from "@/app/components/SponsoredProducts";
import React from "react";
import Reviews from "@/app/components/Reviews/Reviews";
import WriteReviewForm from "@/app/components/Forms/WriteReviewForm";
import ReviewButton from "@/app/components/bottons/ReviewButton";
import SignToReview from "@/app/components/bottons/SignToReview";
import { auth } from "@/auth";
import TableBuilder from "@/app/components/Table/TableBuilder";
import UserReview from "@/app/components/Reviews/UserReview";
import { getQueryClient } from "@/app/lib/queryClient/getQueryClient";
import { productOptions } from "@/app/lib/queryClient/productQueryOptions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import AboutProd from "@/app/components/Reviews/productComponents/AboutProd";
import NextProd_win from "@/app/components/Reviews/productComponents/NextProd_win";
import Delivery from "@/app/components/Delivery/Delivery";
import Image from "next/image";
import Visa from '../../../../public/assets/visa image.png'
import Master from '../../../../public/assets/masterCard.png'

const queryClient = getQueryClient();
const page = async ({ params }) => {
  const param = await params;
  const id = param?.id?.split('-')[1]?.trim()
  
  const user = await auth();

   queryClient.prefetchQuery(productOptions(id));
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid items-stretch pt-4 grid-cols-auto md:auto-rows-auto min-h-screen md:grid-cols-7  gap-2">
        <div className=" md:col-span-2 overflow-x-scroll flex flex-col space-y-2">
          <Carousal2 />
          <div className=" divider my-0"></div>
          <AboutProd id={id} />
        </div>

        <div className="min-h-[calc(100%-50px)] bg-schemes-light-surface  text-schemes-light-onSurface flex flex-col p-2 md:col-span-3">
        <div className=" divider mt-0"></div>
          <NextProd_win id={id} />
          <div className="divider"></div>
          <div id="checkout" className="bg-schemes-light-surface ">
            {user?.user?.id && (
              <UserReview id={id} user_id={user?.user} />
            )}
          </div>
        </div>
        <div className=" md:col-span-2  rounded-[3px] text-gray-900  flex flex-col space-y-2">
        <div className="divider md:hidden my-0"></div>
          <Delivery id={user?.user?.id}/>
          <div className=' space-y-2 flex flex-col justify-center bg-schemes-light-surface  p-2'>
                  <p className='text-sm'>You can buy with below payment options </p>
                  <div className='flex space-x-2'>
                      <figure>
                      <Image  src = {Visa} width={40} height={20} alt='visa'/>
                      </figure>
                      <figure>
                      <Image  src = {Master} width={40} height={20} alt='master'/>
                      </figure>
                      </div>
                </div>
        </div>
        <div className="flex gap-2 md:col-span-5">
          <div className="min-h-[180px]  flex-col flex gap-4 w-full">
          <div className=" divider"></div>
            <div className=" bg-schemes-light-surface  min-h-[200px] py-2  rounded-[3px] flex flex-col space-y-4 px-2">
              <h1 className="  text-schemes-light-onSurface  products relative inline-block">
                Sponsored Products
              </h1>

              <SponsoredProducts />
            </div>
            <div className=" divider my-0"></div>
            <div className=" bg-schemes-light-surface  text-schemes-light-onSurface rounded-[3px] p-2 lg:px-4 md:px-4">
              <TableBuilder />
            </div>
            <div className=" divider my-0"></div>
            <div className="min-h-40   text-schemes-light-onSurface  bg-schemes-light-surface  rounded-[3px] p-2 px-1 flex flex-col space-y-2">
              <p className="text-xl px-2 font-meduim relative products inline-block">
                {" "}
                verified customer feedback
              </p>

              <Reviews id={id} />
              {user?.user?.id ? <ReviewButton /> : <SignToReview />}
              <WriteReviewForm id={id} />
            </div>
            <div className=" divider my-0"></div>
          </div>
        </div>
        {/* <div className=" space-y-2 flex-col flex"> */}
        <div className="hidden md:block md:col-span-2 space-y-4">
        <div className=" divider p-0 m-0"></div>
          <div className="h-[100px]  text-schemes-light-onSurface  bg-schemes-light-surface  items-center rounded-[3px]">
            Seller details
          </div>
          <div className="flex flex-col gap-2  text-schemes-light-onSecondary bg-schemes-light-surface">
            <div className="flex gap-1 px-4 bg-schemes-light-secondary  rounded-[3px]">
              <DetailsIcon />
              <span>Product Details</span>
            </div>
            <div className="flex gap-1 px-4  rounded-[3px]  bg-schemes-light-secondary">
              <DetailsIcon />
              <span>Specifications</span>
            </div>
            <div className="flex gap-1 px-4  bg-schemes-light-secondary rounded-[3px]">
              <DetailsIcon />
              <span>verified customer feedback</span>
            </div>
          </div>

          <div className="min-h-40  rounded-[3px]  text-schemes-light-onSurface  bg-schemes-light-surface ">
            Produt Add to cart and image
          </div>
          <div className=" h-16  text-schemes-light-onSurface  bg-schemes-light-surface ">
            chat with seller
          </div>
        </div>

        {/* </div> */}
      </div>
    </HydrationBoundary>
  );
};

export default page;
