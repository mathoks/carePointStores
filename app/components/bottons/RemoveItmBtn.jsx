"use client"

import { setPrompt } from '@/app/lib/features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import { deleteEntry } from '@/app/utills/utills'
import DeleteIcon from '@/public/icons/DeleteIcon'
import React, { useEffect, useMemo } from 'react'



const RemoveItmBtn = ({id}) => {
    const dispatch = useAppDispatch()
    const deleted = useAppSelector((state)=>state.userCart.deleted ?? false)
    

    useEffect(()=>{
        if(deleted)console.log("gone")
    },[deleted])

  return (
    <button onClick={()=>dispatch(setPrompt({action:true, id}))} className='flex border-none gap-4 btn w-fit justify-start bg-inherit  pt-2'>
    <DeleteIcon/>
    <span className={'text-sm'}>REMOVE</span>
</button>
  )
}

export default RemoveItmBtn
