import React from 'react'
import HeroButton from './bottons/HeroButton'
import Searchbox from './Searchbox'

const Hero = () => {
  return (
    <div
    className="hero min-h-[50%] "
    style={{
      backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
    }}>
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-md space-y-1">
        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
        {/* <Searchbox/> */}
        <p className="mb-5">
         Your Number One Food Suppliments Shopping Destination
        </p>
        <div className='pt-4'>
        <HeroButton tag={"Get Started"} path={"home/products"}/>
      </div>
      </div>
    </div>
  </div>
  )
}

export default Hero