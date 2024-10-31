import React from 'react'
import DeleteIcon from '../../../public/icons/DeleteIcon'
import CallIcon from '../../../public/icons/CallIcon'
import { AddToCart } from '../bottons/AddToCart'
import QuantityBtn from '../bottons/QuantityBtn'

const ItemCard = ({info})=><div className='grid grid-cols-6 gap-2'>
<div className=' col-span-2 '>
<figure className=' flex-grow-0 flex-shrink-0'>
    <img src={info?.img}/>
</figure>
</div>
<div className='col-span-3  p-2 flex flex-col space-y-4 '>
<div className='  font-semibold text-slate-950 text-sm'>
    <h1>Vitamin C 1000mg</h1>
</div>
<div>
    <QuantityBtn items={info?.quantity}/>
</div>
<div className='self-end'>
<button className='flex border-none gap-4 btn w-fit justify-start bg-inherit  pt-2'>
    <DeleteIcon/>
    <span>REMOVE</span>
</button>
</div>

</div>
<div className='overflow-x-scroll'>
<span className='text-[12px] font-bold text-slate-950 '>#6000</span>
</div>

</div>
const CartSummary = ({data = []}) => {

    const List = data.map((prop, id)=><li key={id}>
    <ItemCard info={prop}/>
    </li> )
  return (
    <div className='flex flex-col space-y-4 '>
        <div className='flex flex-col space-y-2 p-4 bg-white px-4 rounded-sm '>
            <div className='flex flex-col space-y-1 text-gray-950'>
                <div className='flex justify-between'>
                <p className=' font-semibold'>Subtotal</p>
                <span className=' font-semibold'>#400</span>
                </div>
                <span className='text-sm text-slate-500'>delivery fees not included yet</span>
            </div>
        </div>
        <ul className='flex flex-col space-y-2 bg-white p-4 rounded-sm'>
            {List}
        </ul>
        
    </div>
  )
}

export default CartSummary