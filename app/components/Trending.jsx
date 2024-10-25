import React from 'react'
import Products from './Products';

const Trending = () => {
    const List = Array.from({ length: 8 }, (_, i) => i + 1);
  return (
    <div className='flex flex-col p-4 gap-4 mb-4 '>
    Trending
    <div className='flex overflow-x-scroll gap-2 lg:flex-wrap '>
    
    {List.map((i)=><Products key={i}  />)}
    
    </div>
 </div>
  )
}

export default Trending