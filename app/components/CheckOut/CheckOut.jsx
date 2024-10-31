"use client"
import React, { useEffect } from 'react'
import { fetchCartData } from '../Cart/CartView'
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import CallIcon from '../../../public/icons/CallIcon'
import { AddToCart } from '../bottons/AddToCart'

const CheckOut = () => {
    const dispatch = useAppDispatch()
    const items = useAppSelector((state) => state.userCart.data);
    
    useEffect(()=>{
    
            fetchCartData()
              .then((data) => {
                dispatch(setData(data));
              })
              .catch((err) => console.log(err))
              .finally(() => console.log('done'));
            
        
    
    },[])
   
   console.log(items)
   const  CheckItem = ({item})=>
   <div>
   <div className='flex justify-between'>
    <div className='flex flex-col space-y-2'>
    <div>
    {item?.name}
    </div>
    <div>
        {item?.quantity }
    </div>
    </div>
    <div className='font-semibold'>{item?.price}</div>
   </div>
   <div className="divider"></div>
</div>
  return (
    <div className='text-slate-800 p-4'>
<div className='flex flex-col space-y-2'>
   <div className='flex justify-between'>
    <h1 className=' font-bold text-xl'>Order Summary</h1>
    <span className='font-bold'>NGN</span>
   </div>
   <span>{items?.length} {"item(s)"}</span>
   <div className="divider"></div>
   </div>
    <ul className=''>
      {items?.map((item, id)=><CheckItem item={item} key={id}/>)}
    </ul>
    <div>
    <div className="flex items-center w-full flex-wrap justify-between gap-2 py-4 px-2">
        <div className="border border-orange-400 btn bg-white">
          <CallIcon fillcol={"orange"} />
        </div>
        
        <AddToCart tag={"CHECKOUT"} />
      </div>
    </div>
    </div>
  )
}

export default CheckOut
