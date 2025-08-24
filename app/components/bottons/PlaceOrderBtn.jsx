import React, { memo } from 'react'

const PlaceOrderBtn = memo(function BtnPlace({Total, disabled, isSubmitting}){
  return (
    <button disabled={disabled} className='btn w-full bg-schemes-light-primary text-schemes-light-onPrimary'>
    { isSubmitting ? 'Please wait....' :  `Place order   NGN${Total}`} 
    </button>
  )
})

export default PlaceOrderBtn
