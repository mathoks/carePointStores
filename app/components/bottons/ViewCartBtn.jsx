"use client"

import React from 'react'
import { fetchCartData } from '../Cart/CartView'
import { useAppDispatch } from '@/app/lib/hooks'
import { setData } from '@/app/lib/features/cart/cartSlice'
import Link from 'next/link'



const ViewCartBtn = () => {
    const dispatch = useAppDispatch()
    const handleChange=(e)=>{
        fetchCartData()
          .then((data) => {
            console.log(data)
            dispatch(setData(data));
          })
          .catch((err) => console.log(err))
          .finally(() => console.log('done'));
        
    }
    

  return (
    <button onClick={handleChange} className="btn btn-primary btn-block"><Link href={"/home/cart"}>View cart</Link></button>
  )
}

export default ViewCartBtn
