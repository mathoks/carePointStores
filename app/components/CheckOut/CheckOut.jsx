"use client"
import React, { memo, useMemo } from 'react'
import { useAppSelector } from '@/app/lib/hooks'
import CallIcon from '../../../public/icons/CallIcon'
import { AddToCart } from '../bottons/AddToCart'
import { Summarize } from '@/app/utills/utills'
import Visa from '../../../public/assets/visa image.png'
import Master from '../../../public/assets/masterCard.png'
import Link from 'next/link'
import Image from 'next/image'

const CheckOut = ({user}) => {
    const items = useAppSelector((state) => state.userCart.data);
    const Total  = useAppSelector((state) => state.userCart.subTotal);
   
    const Summarized = useMemo(()=>Summarize(items), [items])
  
   const  CheckItem = memo(function CheckOut({item}){
   return (
    !!item?.variant?.length ? <div>
      <div className=' font-semibold'>
      {item.name ?? item?.product?.name }
      </div>
      <div>
        {item?.variant.map((variant) => 
        <div key={variant.variant_id} className='grid  grid-cols-4 gap-2 ml-2'>
        
    <div className=' col-span-3 grid grid-cols-6'>
    <div className=' col-span-4  items-center'>
    { variant?.variant_name ?? variant?.product_variant?.variant_name}
    </div>
    <div className='col-span-2 flex justify-end text-sm'>
     @{variant?.Price} x {variant.Quantity}
    </div>
    </div>
    <div className='font-semibold text-sm col-span-1 flex justify-end'><span>&#8358;</span>{variant?.Quantity * variant?.Price}</div>
        </div>)}
      </div>
      
      <div className="divider"></div>
    </div> : (
    <><div className='grid grid-cols-4 gap-2'>
    <div className=' col-span-3 grid grid-cols-6'>
    <div className=' col-span-4  items-center font-semibold line-clamp-2'>
    { item?.name ?? item?.product?.name}
    </div>
    <div className='col-span-2 flex justify-end text-sm'>
     @{item?.Price} x {item.Quantity}
    </div>
    </div>
    <div className='font-semibold text-sm col-span-1 flex justify-end'><span>&#8358;</span>{item?.Quantity * item?.Price}</div>
   </div>
   <div className="divider"></div>
   </>
   )) }
   )
if(items.length <= 0){
    return <div className=' py-2 flex justify-center'>You have no item in your cart</div>
}
  return (
    <div className='text-slate-800 p-4'>
<div className='flex flex-col space-y-2'>
   <div className='flex justify-between'>
    <h1 className=' font-bold text-xl relative inline-block products'>Order Summary</h1>
    <div className='flex gap-2'>
    <span className='font-bold text-sm text-gray-500'>NGN</span>
    <span className='font-bold '>{Total}</span>
    </div>
   </div>
   <span>{items?.length} {"item(s)"}</span>
   <div className="divider"></div>
   </div>
    <ul className=''>
      {Summarized?.map((item, id)=><CheckItem item={item} key={id}/>)}
    </ul>
    <div>
    <div className="flex items-center w-full  flex-nowrap justify-between gap-2 py-4 px-2">
        <div className="border border-schemes-light-outline btn bg-schemes-light-primaryContainer">
          <CallIcon fillcol={"#68548e"} />
        </div>
        <div className=' shrink flex-grow w-full flex'>
        <AddToCart tag={"CHECKOUT"} show={true} style={"btn"} itemID={null} user={user}  total= {Total} item={items}/>
      </div>
      </div>
      <Link href={'/home'} className='mx-auto flex justify-center link-primary '>Continue shopping</Link>
      <div className=' divider'></div>
      <div className=' space-y-2 flex flex-col justify-center'>
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
    </div>
  )
}

export default CheckOut
