import { States } from '@/app/util/StatesLga'
import React from 'react'

const State = ({setState}) => {
    const handleChange = (e)=>{
       
        setState(e?.target?.value)
    }
  return (
    <select onChange={handleChange} className="select select-bordered w-full bg-white">
  <option disabled selected>Choose Your Location</option>
  {States.map((value, i)=><option value={value} key={i}>{value}</option>)}
</select>
  )
}

export default State