"use client"
import { setIsCompletePrompt } from '@/app/lib/features/cart/cartSlice'
import { useAddToCart, useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import React from 'react'
import { useSession } from "next-auth/react";

const DeletePrompt = () => {
    const prompt = useAppSelector((state)=>state.userCart.prompt)
    const id = useAppSelector((state)=>state.userCart.id)
    const dispatch = useAppDispatch()
    const {data} = useSession()
    const {mutate } = useAddToCart(data?.user?.id ?? 'guest')
        const handler = ()=>{
      mutate({data: {CartItemID: id}, increamentData: {delete: true}})
    }
    return (
<dialog id="my_modal_5" className="modal  modal-bottom sm:modal-middle" open={prompt}>
  <div className="modal-box bg-schemes-light-primaryContainer">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Do you want to remove this item from the cart</p>
    <div className="modal-action ">
      <form method="dialog" className='space-x-2 flex'>
        {/* if there is a button in form, it will close the modal */}
        <button onClick={handler} className="btn bg-schemes-light-primary text-schemes-light-onPrimary">Yes</button>
        <button onClick={()=>dispatch(setIsCompletePrompt("no"))} className="btn bg-schemes-light-primary text-schemes-light-onPrimary">No</button>
      </form>
    </div>
  </div>
</dialog>
    )
}


export default DeletePrompt
