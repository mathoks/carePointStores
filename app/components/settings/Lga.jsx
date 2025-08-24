'use client'
import { setLocation } from '@/app/lib/features/settings/settingsSlice'
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import { lgaList } from '@/app/util/StatesLga'
import React, { memo, useMemo } from 'react'

const Lga = memo(function LGAS({name}){
    //    const shippingloction = useAppSelector(state => state.settings.shippingloction) 
        const dispatch = useAppDispatch()
       const handler = (e)=>{
            dispatch(setLocation({lga: e.target.innerText}))
           
        }
       const Options = Object.keys(lgaList).find(state=> state === name) 
       const element = useAppSelector(state=>state.settings.page3)
       
       const DefaultPage = useMemo(() => {
         return (
           <div className=" grid grid-flow-row place-items-start ml-8 gap-4">
           <p className=' font-semibold'>{name}</p>
             {Options !== null
                     && lgaList[Options]?.map((lga, id) => (
               <button key={id} onClick={handler}>{lga}</button>
             ))}
           </div>
         );
       }, [Options]);
       const Pages = {
        default: DefaultPage
       }
  return (
    <div className='py-16'>
      {Pages[element]}
    </div>
  )
})

export default Lga
