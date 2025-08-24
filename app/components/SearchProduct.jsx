import { useSuspenseQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { ratingsSummaryOptions } from '../lib/queryClient/productQueryOptions'
import RatingSum from './Reviews/RatingSum'

const SearchProduct = ({item}) => {
    const {id, name, description, price} = item
    const {data: reviewStats} = useSuspenseQuery(ratingsSummaryOptions(id))
    
  return (
    <Suspense className='flex flex-col space-y-1'>
    <Link href={`/home/product/${id}`} className="card my-0 card-side bg-schemes-light-background text-schemes-light-onPrimaryContainer">
  <figure className='w-fit rounded-none justify-start'>
    <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      alt="Movie" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-base">{name}</h2>
    <p className='text-sm  line-clamp-2'>{description}</p>
    <RatingSum data={reviewStats} show={false}/>
    <p className=' font-semibold '><span>&#8358;</span>{price}</p>
    <div className="card-actions justify-end w-full">
      <button className="btn w-full btn-outline btn-sm">Buy now</button>
    </div>
  </div>
</Link>
<div className=' divider'></div>
</Suspense>
  )
}

export default SearchProduct