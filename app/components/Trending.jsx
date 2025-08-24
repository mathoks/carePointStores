"use client"
import React, { memo, Suspense } from 'react'
import Products from './Products';
import { useSuspenseQuery } from '@tanstack/react-query';
import { trendingproductOptions } from '../lib/queryClient/productQueryOptions';
import Image from 'next/image';
import TrendingIcon from '@/public/icons/Trending';
import { useSearchParams } from 'next/navigation';


const TrendingProduct = memo(function TrendingProduct ({item}) {
  return <div className=' rounded-sm  cursor-pointer grid grid-flow-row   gap-0  min-w-40 max-w-40 bg-schemes-light-surface   text-schemes-light-onPrimaryContainer h-fit'>
  <div className='ring-1 ring-schemes-light-outline rounded-t-sm' style={{gridRow: '1/5'}}>
  <figure className=' h-36 overflow-y-hidden'>
    <img  className='object-contain ' src={item?.prodimage[0]?.image} alt='img'/>
  </figure>
  </div>
  <div className=' outline-2 outline-schemes-light-outline border-2 border-t-0 rounded-b-md space-y-2 py-2'>
  <div className=' truncate'><p className=' text-sm font-semibold px-1'>{item?.name}</p></div>
  <div className=' font-semibold px-1'><span>&#8358;</span>{item?.price}</div>
  </div>
  </div>
})
const Trending = () => {
  const params = useSearchParams()
  const category = params.get('category')
  const {data, isLoading, isError, isPending} = useSuspenseQuery(trendingproductOptions(category))
  
    // const List = Array.from({ length: 8 }, (_, i) => i + 1);
  return (
    <Suspense fallback={"loading"}>
    <div className='flex  flex-col py-2 px-1 gap-1 mb-4 bg-schemes-light-surface'>
    <div className='flex gap-1 items-center'>
    <p className='font-semibold products relative inline-block'>Trending</p>
     <TrendingIcon/> 
    </div>
    
    <div className='flex-nowrap pl-1 w-[calc(100vw-20px)] md:w-full   carousel py-2  md:gap-4 justify-between gap-2'>
    
    {data.map((item, id)=> <TrendingProduct key={id} item = {item}/>)}
    
    </div>
 </div>
 </Suspense>
  )
}

export default Trending