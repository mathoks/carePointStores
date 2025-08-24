'use client'
import React from 'react'
import { ComputeDiscount } from '../../Products'
import AddCart from '../../Cart/AddCart'
import { useSuspenseQuery} from '@tanstack/react-query'
import { productOptions, ratingsSummaryOptions } from '@/app/lib/queryClient/productQueryOptions'
import RatingSum from '../RatingSum'
import { useAppSelector } from '@/app/lib/hooks'



const NextProd_win = ({id}) => {
    const currentVar = useAppSelector(state => state.userCart.currentVariant)
    const {data} = useSuspenseQuery(productOptions(id))
    const {data: reviewStats} = useSuspenseQuery(ratingsSummaryOptions(id))





  return (
    <>
    <div className="flex flex-col rounded-b-md border border-schemes-light-outline ">
          <div className="flex bg-schemes-light-surfaceTint   text-sm justify-between text-schemes-light-onPrimary   p-1.5">
            <span>Flash sales</span>
            <span>Time left</span>
          </div>
          <div className="flex flex-col bg-schemes-light-primaryContainer text-schemes-light-onPrimaryContainer">
            <div className="flex space-x-3 items-center p-2">
              <span className=" text-xl font-semibold">
                <span>&#8358;</span>
                {!!data.variant.length ? data?.variant[currentVar]?.price : data.price}
              </span>
              <span className=" text-slate-500">{data?.originalPrice}</span>
              <ComputeDiscount
                info={data}
                style={
                  "text-sm bg-schemes-light-tertiaryContainer text-schemes-light-onTertiaryContainer"
                }
              />
            </div>
            <div className="flex space-x-3 items-center px-2 py-1">
              <span className="text-sm">50 items left</span>
              <progress
                className="progress text-green-400  bg-schemes-light-surface    w-56"
                value={data?.stockQt}
                max="100"
              ></progress>
            </div>
          </div>
        </div>
        <div className=" min-h-[49px]  px-2 space-y-2">
          <div className=" my-4">
           <RatingSum data={reviewStats}/>
          </div>
          {/* <AddCart variants={!!data?.variant.length ? data?.variant : data} /> */}
          <AddCart variants={data} />
          <div className="hidden md:bock lg:block">
            Call 08067870424 to book your order
          </div>
        </div>
        </>
  )
}

export default NextProd_win