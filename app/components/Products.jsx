import Link from 'next/link'
import React from 'react'

const Products = ({style}) => {
  return (
    <Link href={'/home/products'} className={`card bg-base-100 min-w-[180px] max-w-[200px] lg:w-60  shadow-xl ${style}`}>
    <figure>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Shoes" />
    </figure>
    <div className="card-body px-2">
      <h2 className="card-title">
        Shoes!
        <div className="badge badge-secondary">NEW</div>
      </h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div className="card-actions justify-end">
        <div className="badge badge-outline p-4">Add to cart</div>
        <div className="badge badge-outline p-4">Buy now</div>
      </div>
    </div>
  </Link>
  )
}

export default Products