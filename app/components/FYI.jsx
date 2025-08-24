import { useSuspenseQuery } from '@tanstack/react-query'
import React, { memo, Suspense } from 'react'
import { productFYIOptions } from '../lib/queryClient/productQueryOptions'
import { toLower } from 'lodash'


const FYI = memo(function FYY({ category}){
   const  {data} = useSuspenseQuery(productFYIOptions(toLower(category)))

   return (
    <Suspense className= 'pt-4'>
    <div className="flex gap-1 items-center justify-start text-schemes-light-onSurface ">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
      />
    </svg>
    <div className=" text-xl font-bold">Just FYI</div>
  </div>
  <div
  className=' first-line:font-semibold'
    dangerouslySetInnerHTML={{__html: data?.hint_text}}
  />
  </Suspense>
  )
})

export default FYI