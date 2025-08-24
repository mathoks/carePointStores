
import Link from 'next/link';
import React from 'react'


const HeroButton = (props = {path: null, tag: null}) => {
    if (props?.path == null || props?.tag == null) {
        throw new Error("Path and tag are required")
    }

  return (
    <button className="btn  bg-schemes-light-primary text-schemes-light-onPrimary border-none "><Link href={`${props?.path}`}>{props?.tag}</Link></button>
  )
}

export default HeroButton
