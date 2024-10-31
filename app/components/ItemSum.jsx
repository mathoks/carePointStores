"use client"
import React from 'react'
import DeleteIcon from '../../public/icons/DeleteIcon'

const ItemSum = ({item = [], setItem}) => {
    const deleteItem = (index)=>{
        const newItem = [...item]
        newItem.splice(index, 1)
        setItem([...newItem])
        
    }
   
if(item.length < 0) return null
  return (
    <div className='flex flex-col space-y-2'>
      {item.map((ite, i)=> ite.quantityReq >  0 ? <div key={i} className='flex justify-between w-[calc(100%-200px)] md:w-[calc(100%-300px)]  items-center'>
        <span className='text-sm text-orange-300 flex-grow md:flex-grow-0' >{ite?.tag}</span>
        <span className=' text-sm w-[20%] text-end  mr-3'>{ite?.quantityReq}</span>
        <button  onClick={()=>deleteItem(i)} className='btn-outline btn text-orange-500 btn-sm'><DeleteIcon /></button>
      </div> : null)}
    </div>
  )
}

export default ItemSum
