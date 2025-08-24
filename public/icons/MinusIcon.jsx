import React from 'react'

const MinusIcon = ({operation = "minus"}) => {
  return (
    <svg data-operation = {operation} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path data-operation = {"minus"} strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
</svg>

  )
}

export default MinusIcon
