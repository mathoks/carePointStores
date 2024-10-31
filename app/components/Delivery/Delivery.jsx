import React from 'react'
import StateCity from '../inputs/StateCity'

const Delivery = () => {
  return (
    <div className="p-2 flex flex-col space-y-4 bg-white text-slate-900 rounded-sm">
    <h1 className="font-medium text-slate-400 ">Delivery & Returns</h1>
    <StateCity/>
    <div>
        cost of shipping to prefered location here
    </div>
    <div>
    <div>
        <div>
            <span>Return Policy</span><br></br>
            <span className="text-sm">Free Return For All <span className=" text-blue-400">Eligible Items</span></span>
        </div>
        </div>
        <div>
        <div>
            <span>Warranty</span><br></br>
            <span className="text-sm">All Products Are Guaranteed</span>
        </div>
        </div>
        </div>
        </div>
  )
}

export default Delivery
