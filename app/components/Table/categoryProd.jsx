"use client"
import React, { } from 'react'
import { useAppSelector } from '@/app/lib/hooks'
import { SearchOptions } from '@/app/lib/queryClient/productQueryOptions'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import Products from '../Products'
import VariantDrawer from '../bottons/VariantDrawer'
import { useSession } from 'next-auth/react'



const CategoryProducts = ({category}) => {
const {data: userData} = useSession()
const isLoadingCart = useAppSelector((state) => state.userCart.isLoadingCart);
const { data} =
    useSuspenseInfiniteQuery(SearchOptions({query:category, pageParam: undefined}));   
    console.log(data, category)
 if(data.pages[0].length === 0)return <div className='px-4'><p>No item found</p></div>; 
 return (
   <div className='grid auto-cols-auto py-8 md:px-4 px-2 gap-2'>
   <div className=' font-medium '>
    <p className='relative inline-flex products font-semibold'>Products in this category :</p>
   </div>
   
   {data?.pages?.map((pages, id) => (
        <div className=' grid grid-cols-2 items-center md:grid-cols-3   gap-1 mx-auto' key={id}>
          { !isLoadingCart && pages?.map((page, ids) => (
            <Products key={page?.id || ids} info={page}/>
          ))}
        </div>
      ))}
      <VariantDrawer userId={userData?.user?.id}/>
   </div>
  )
}

export default CategoryProducts
