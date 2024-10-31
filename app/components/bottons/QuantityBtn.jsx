"use client"
import { useAppSelector } from '@/app/lib/hooks';
import React from 'react'
import MinusIcon from '../Cart/MinusIcon';
import AddIcon from '../../../public/icons/AddIcon';

const QuantityBtn = ({items}) => {
    
  return (
    <div>
          <div className="flex items-center w-fit  border border-gray-500 rounded-md px-[3.5px]">
            <button
              onClick={()=>handleQuantityChange("minus")}
              className="border-none   btn-sm  rounded-none  btn bg-slate-100"
            >
              <MinusIcon/>
            </button>
            <button id="win" className=" w-10  px-3  text-orange-500  text-sm ">
              {items}
            </button>
            <button
              onClick={()=>handleQuantityChange("add")}
              className="border-none btn  text-slate-500  btn-sm bg-slate-100 rounded-none"
            >
              <AddIcon/>
            </button>
          </div>
        </div>
  )
}

export default QuantityBtn
