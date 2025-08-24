"use client"
import { useAppDispatch } from '@/app/lib/hooks'
import React from 'react'

const CloseIcon = ({close = null}) => {
  const dispatch =  useAppDispatch()
  const handleClose = ()=>{
    if(close !== null){
      dispatch(close())
    }
    else return
  }
  return (
    <button className=' h-fit' onClick={handleClose}>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
</button>
 

  )
}

export default CloseIcon
