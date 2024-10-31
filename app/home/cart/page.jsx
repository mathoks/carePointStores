import { AddToCart } from '@/app/components/bottons/AddToCart'
import CartView from '@/app/components/Cart/CartView'
import CheckOut from '@/app/components/CheckOut/CheckOut'
import Delivery from '@/app/components/Delivery/Delivery'
import CallIcon from '@/public/icons/CallIcon'
import SponsoredProducts from '@/app/components/SponsoredProducts'
import React from 'react'

const page = () => {
  return (
    <div className='md:grid md:grid-cols-3 md:space-y-0 space-y-4 flex flex-col  md:gap-4 min-h-dvh'>
        <CartView/>
        <div className='flex flex-col space-y-4 w-full'>
        <Delivery/>
        <div className='bg-white rounded-sm'>

        <CheckOut/>
         </div> 
        </div>
        <div className=' md:col-span-2 space-y-2 '>
        <div className='space-y-2'>
        <h1 className='md:text-xl font-bold  '>You Might Like To Add</h1>
        </div>
        <SponsoredProducts/>  
        </div>
        
        
    </div>
  )
}

export default page