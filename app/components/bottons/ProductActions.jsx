'use client'
import React, { memo} from 'react'
import AddButtons from './AddButtons'
import { AddToCart } from './AddToCart'
import { useAppSelector } from '@/app/lib/hooks'
import VariantDrawer from './VariantDrawer'

const ProductActions = memo(function ActionsProd({info}){
    const {variant,  id} = info
  
  return (
    <div className="card-actions shadow-md bottom-3 gap absolute w-full justify-center">
          <AddToCart
           tag={"Add to cart"}
           item = {info}
          //  item= {!!variant?.length ? {variant: variant, name:info.name, img:info?.prodimage[0]?.image} : info}
           itemID = {id}
           show = {false}
           proVariants = {!!variant?.length }
        /> 
        {/* } */}
    </div>
  )
})

export default ProductActions