"use client"
import Stars from '@/app/util/Stars'
import React, {memo} from 'react'

const RatingSum = memo(function RatingWind({data, show = true}){
  return (
          !!Object.keys(data).length &&
            <div className="flex gap-2 items-center mt-2">
              <Stars size={"text-blue-400 text-md font-medium"} rating={Number(data?.average_rating)} />
              {show ? <span className="text-sm text-blue-400 font-m">{`(${data?.total_reviews} reviews)`}</span> : <span className="text-sm text-blue-400 font-m">{`(${data?.total_reviews})`}</span> }
            </div>
         
  )
})

export default RatingSum