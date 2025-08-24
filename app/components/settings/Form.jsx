"use client"
import { setPage4 } from '@/app/lib/features/settings/settingsSlice'
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import { States } from '@/app/util/StatesLga'
import React, { memo, useMemo } from 'react'
import Lga from './Lga'

const Form = memo(function Form5({name}){
const dispatch = useAppDispatch()
const selectedState = useAppSelector(state=>state.settings.page4)
const handler = (e)=>{
    dispatch(setPage4({page:'page', state: e.target.innerText}))
}

const Statess = useMemo(()=>{
return (
    <div className='grid grid-flow-row gap-4 place-items-start py-20 z-10 mx-8'>
    {States.map((state, id) => <button onClick={handler}  className=' cursor-pointer' key={id}>
       {state}
    </button>)}
    </div>
)
},[States])

const Pages = {
    default: Statess,
    page:     <Lga name={selectedState?.state}/>
}
  return (
    <div className='py-4 pt-0 space-y-16 mt-0'>
     <div className='flex pt-4 z-50 top-[7.6rem] bg-white fixed w-full space-x-4 px-4 border-b-2 pb-4'>
    <p>{name}</p>
    <span>&gt;</span>
    <span onClick={()=>dispatch(setPage4({page:'default', state: null}))} className={` ${selectedState.state ? 'inherit' : 'text-schemes-light-primary'}`}> {'State'}</span>
    {selectedState.state && (<><span>&gt;</span>
    <span className=' text-schemes-light-primary'> {"Lga"}</span>
    </>)}
     </div> 
    
    {Pages[selectedState.page]}
    </div>
  )
})

export default Form
