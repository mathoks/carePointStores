"use client"
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProgressCheck = () => {
  const pathname = usePathname()
  const [progress, setProgress] = useState([0, 0])
  useEffect(()=>{
    if(pathname.includes('complete-order')){
      setProgress([100, 80])
    } else {
      setProgress([80, 0])
    }
  },[pathname])
  return (
    <div className="grid grid-cols-5 bg-schemes-light-surface  px-2 py-0 items-center ">
      <div className="flex flex-col space-y-2 flex-grow items-start col-span-2">
        <div className="flex flex-col items-start w-full">
         
          <div className="flex items-center w-full relative">
          <div className=" flex flex-col items-center">
          <p className=" text-nowrap">Your Cart</p>
            <div
              className={` rounded-full w-8 shrink-0 h-8 flex items-center justify-center ${
                !progress[0]
                  ? "bg-schemes-light-secondary"
                  : "bg-schemes-light-primary"
              }`}
            >
              <p className="text-white">1</p>
            </div>
            </div>
            <progress
              max={100}
              value={progress[0]}
              className=" progress h-[6px] w-[85%] flex-grow  absolute top-9 left-12 md:w-[91%] "
            ></progress>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2 flex-grow items-start col-span-2">
        <div className="flex flex-col items-start w-full ">
          {/* <p className=" text-nowrap left--8 top-4 ml--6 absolute">Checkout </p> */}
          <div className="flex items-center   w-full relative">
          <div className=" flex flex-col items-center">
          <p className=" text-nowrap">Checkout </p>
            <div
              className={` rounded-full w-8 shrink-0 h-8 flex items-center justify-center ${
                progress[0] < 100 ? "bg-gray-300" : "bg-schemes-light-primary"
              }`}
            >
              <p className="text-white">2</p>
            </div>
            </div>
            <progress
              max={100}
              value={progress[1]}
              className=" progress h-[6px] w-[85%] flex-grow  absolute top-9 left-12 md:w-full"
            ></progress>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2 flex-grow items-start col-span-1">
        <div className="flex flex-col items-start w-full">
          <div className="flex items-center w-full flex-col ">
          <p className=" text-nowrap">Completed</p>
            <div
              className={`rounded-full w-8 shrink-0 h-8 flex items-center justify-center bg-gray-300`}
            >
              <p className="text-white">1</p>
            </div>
            {/* <hr className=' h-1 bg-black flex-grow' /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCheck;
