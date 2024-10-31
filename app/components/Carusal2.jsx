import React from 'react'

const Carousal2 = () => {
    const List = ["https://healthplusnigeria.com/cdn/shop/files/imz9yocdw1caxmvwfpmt.webp?v=1726896807","https://m.media-amazon.com/images/I/61mpEXbBXoL._AC_UF1000,1000_QL80_.jpg","https://healthplusnigeria.com/cdn/shop/files/imz9yocdw1caxmvwfpmt.webp?v=1726896807" ]
  return (
<div className="carousel last:mr-2">
 {List.map((image, id)=><img className=' pb-2 w-full' src={image} key={id}/>)}
</div>
  )
}

export default Carousal2