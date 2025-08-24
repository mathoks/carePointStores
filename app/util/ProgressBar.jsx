import React from 'react'

const ProgressBar = ({value, h =""}) => {
  return (
    <progress className={`progress w-56 ${h}`} value={value} max="100"></progress>
  )
}

export default ProgressBar