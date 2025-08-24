// "use client"
import SubTotal from '@/app/components/Cart/SubTotal'
import FeedBack from '@/app/components/FeedBack'
import HeaderPath from '@/app/components/headerPath'
import CategoryProducts from '@/app/components/Table/categoryProd'
import Tabs from '@/app/components/Tabs'
import Trending from '@/app/components/Trending'
import React from 'react'

const page = async({params}) => {
  const cate = await params
 
  return (
    <div className='grid grid-cols-9 min-h-svh gap-0'>
    <div className='  mt-8 py-4 col-span-full md:col-span-8'>
    <HeaderPath/>
    {/* </div> */}
      <Trending/>
      <div className=' grid grid-flow-col auto-cols-auto gap-0'>
      <div className='mb-5 hidden md:block row-span-full w-32 border-e-2 border-t-2 rounded-tr-badge lg:w-32'>
      </div>
      <div className=' md:border-b-2 md:rounded-bl-badge'>
        <CategoryProducts category={cate?.category}/>
      </div>
      </div>
      </div>
      <div className=' hidden md:block border-s-2 pt-8 mb-4 text-sm px-1'>
      <p className='products relative inline-block'>Cart total</p>
      <SubTotal/>
      </div>
    </div>
  )
}

export default page
