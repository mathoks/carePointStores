import React from 'react'

const Tabs = () => {
    const List = ['Vitamins', 'Weight-gainers', 'Laxatives', 'Food-suppliments', "Muscle-build"]
  return (
    <div className=' overflow-x-scroll flex gap-2 p-4 mb-8 mr-2'>
{List.map((val, i)=> <span key={i} className=' rounded-full bg-slate-600 p-2.5 text-nowrap'>{val}</span>)}
    </div>
  )
}

export default Tabs