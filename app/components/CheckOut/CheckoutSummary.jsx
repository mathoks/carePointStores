"use client"
import React, { memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import CardForm from './CardForm'
import Visa from '../../../public/assets/visa image.png'
import Master from '../../../public/assets/masterCard.png'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { addToCart } from '@/app/lib/features/cart/cartSlice'
import { getQueryClient } from '@/app/lib/queryClient/getQueryClient'



const CheckOutSummary = ({isLoggedIn}) => {
    const dispatch = useAppDispatch()
    const path = usePathname()
    const router = useRouter()
    const items = useAppSelector((state) => state.userCart.data);
    const Total  = useAppSelector((state) => state.userCart.subTotal);
   
    useEffect(() => {
      const queryClient = getQueryClient()
      console.log(isLoggedIn)
      const handleBeforeUnload = ()=> {
        if(!isLoggedIn){
        queryClient.resetQueries({ queryKey: ['cart'], exact: true })
        queryClient.setQueryData(['cart'], [])
        dispatch(addToCart([]))
        } else return;
      }

      if(!!isLoggedIn && path.includes('guest')){
        router.replace(`/home/cart/${isLoggedIn}/complete-order`)
      }
       window.addEventListener('beforeunload', handleBeforeUnload);
  return()=>{
     window.removeEventListener('beforeunload', handleBeforeUnload);
  }
    }, [dispatch, isLoggedIn, path, router])
    
   const  CheckItem = memo(function CheckOut({item}){
    
   return (
   <div className=''>
   <div className='grid grid-cols-6 gap-2'>
    <div className='flex flex-col space-y-2 col-span-5'>
    <div className='grid grid-cols-6 gap-2 items-center'>
    <div className=' col-span-4'>
      <p>{item.isVariant === 'true' ? item?.
        product_variant?.product.name : item?.product?.name}</p>
      <p>{item.isVariant === 'true' && item?.
      product_variant?.variant_name }</p>
    </div>
    <span className=' col-span-1 flex justify-end'> x </span> 
    <span >{item?.Quantity }</span>
    </div>
    </div>
    <div className='font-semibold text-sm flex-col col-span-1 justify-end'><span>&#8358;</span>{item?.TotalPrice}</div>
   </div>
   <div className="divider"></div>
</div>)}
   )

if(items.length <= 0){
    return <div className=' p-2'>You have no item in your cart</div>
}
  return (
    <div className='text-slate-800 p-4 space-y-2'>
<div className='flex flex-col space-y-2'>
<div className=' font-bold text-xl products relative inline-block'>Your Order Summary</div>
   <div className='flex justify-between'>
    <h1 className=' font-bold '>subTotal</h1>
    <div className='flex gap-2'>
    <span className='font-bold text-sm text-gray-500'>NGN</span>
    <span className='font-bold '>{Total}</span>
    </div>
   </div>
   <span>{items?.length} {"item(s)"}</span>
   <div className="divider"></div>
   </div>
    <ul className=''>
      {items?.map((item, id)=><CheckItem item={item} key={id}/>)}
    </ul>
    <form>
    <div className='flex justify-between font-semibold'>
        <h1 className=' '>Tax</h1>
        <h1 className=' text-sm'>0.00</h1>
    </div>
    <div className='flex justify-between font-semibold'>
        <h1 className=' font-semibold'>Delivery Fee</h1>
        <h1 className=' text-sm'>0.00</h1>
    </div>
    <div className=' divider'></div>
    <div className='grid grid-cols-3 gap-4 items-center'>
    <div className='flex space-x-1 items-center py-2 col-span-2'>
        <input type='radio'  className='radio-sm '></input>
        <label>Credit Card</label>
    </div>
    <div className='flex space-x-2'>
    <figure>
    <Image  src = {Visa} width={40} height={20} alt='visa'/>
    </figure>
    <figure>
    <Image  src = {Master} width={40} height={20} alt='master'/>
    </figure>
    </div>
    </div>
    </form>
    <CardForm Total={Total}/>
    </div>
  )
}

export default CheckOutSummary
