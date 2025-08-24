"use client"
import React, { memo } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { productOptions } from '@/app/lib/queryClient/productQueryOptions'
import ShareIcon from '@/public/icons/ShareIcon'

const AboutProd = memo(function AboutP({id}){
    const {data} = useSuspenseQuery(productOptions(id))
    
  return (
    <div className="bg-schemes-light-surface  h-[30%] w-full lg:h-full md:h-[70%] p-2 space-y-2">
        <div className='flex justify-between mr-2'>
        <div className=" bg-schemes-light-tertiaryContainer products relative inline-block   w-fit p-2 text-sm text-schemes-light-onTertiaryContainer  ">
            Official Store
          </div>
          <ShareIcon/>
        </div>
         
          <div>
            <p className=" text-wrap font-semibold ">{data?.name}</p>
          </div>
          <div>
            <p className=" text-wrap text-sm">
              {" "}
              <span className=" font-semibold">Brand:</span> Name here
            </p>
          </div>
          <div>
            <p className=" text-wrap text-sm">
              {" "}
              <span className=" font-semibold">About:</span> {data?.description}
            </p>
          </div>
        </div>
  )
})

export default AboutProd
