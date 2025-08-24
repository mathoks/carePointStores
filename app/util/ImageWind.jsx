import React, { memo} from 'react'

const ImageWind = memo( function Swap({imgUrl}){
  return (
    <div className=' carousel bg-schemes-light-surfaceContainer'>
      <figure>
        <img src={imgUrl}  />
      </figure>
    </div>
  )
})

export default ImageWind
