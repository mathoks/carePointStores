'use client'
import { useAppSelector} from "@/app/lib/hooks";
import React, { memo } from "react";

const SubTotal = memo(function ToTalSum({Total}){
  // console.log(Total)
  // const Total = useAppSelector((state) => state.userCart.SubTotal);
  console.log(Total)
  return (
    <div className="flex flex-col space-y-2 p-4 bg-schemes-light-surface px-4 rounded-sm ">
      <div className="flex flex-col space-y-1 text-gray-950">
        <div className="flex justify-between">
          <p className=" font-semibold products relative inline-block">
            Subtotal
          </p>
          {/* <span className=' font-semibold'>{Total}</span> */}
          <div className="flex gap-2">
            <span className="font-bold text-sm text-gray-500">NGN</span>
            <span className="font-bold ">{Total}</span>
          </div>
        </div>
        <span className="text-sm text-slate-500">
          delivery fees not included yet
        </span>
      </div>
    </div>
  );
});

export default SubTotal;
