"use client"
import React, { useState } from 'react'
import ImageWind from '../util/ImageWind'

const Carousal2 = () => {
    const List = ["https://healthplusnigeria.com/cdn/shop/files/imz9yocdw1caxmvwfpmt.webp?v=1726896807","https://m.media-amazon.com/images/I/61mpEXbBXoL._AC_UF1000,1000_QL80_.jpg","https://healthplusnigeria.com/cdn/shop/files/imz9yocdw1caxmvwfpmt.webp?v=1726896807" ]
    const [img, setImage] = useState(List[0])
    const [index, setIndex] = useState(0)
 
    const handleSwap = (id)=>{
        setIndex(id)
        setImage(List[id])
    }

  return (
<div className='flex flex-col space-y-2 pb-4'>
<ImageWind imgUrl = {img}/>

<div className="carousel px-2 pb-2 pt-1  text-schemes-light-onSurface  bg-schemes-light-surface  items-center">

 {List.map((image, id)=><button key={id} className='btn active:border-orange-500  py-0 bg-white px-0 w-20 h-20 mr-4 border-none outline-none shadow-none'><img className={`rounded-md border-2 ${index === id ? "border-schemes-light-outline border-1 " : ""}`} src={image} onClick={()=>handleSwap(id)} /></button>)}
</div>
</div>
  ) 
}

export default Carousal2