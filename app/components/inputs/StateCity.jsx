"use client"
import React, { useState } from 'react'
import State from './State'
import City from './City'

const StateCity = () => {
    const [state, setState] = useState(null)
  return (
    <div className='flex flex-col space-y-6 mt-2'>
        {/* <span>Choose Your Location</span> */}
        <State setState={setState}/>
        <City state={state}/>
    </div>
  )
}

export default StateCity