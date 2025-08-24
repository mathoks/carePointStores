import Link from "next/link";
import React, { memo } from "react";
import ProductActions from "./bottons/ProductActions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ratingsSummaryOptions } from "../lib/queryClient/productQueryOptions";
import RatingSum from "./Reviews/RatingSum";
import Image from "next/image";

export const ComputeDiscount = memo(function Discount({info, style}){
  const discounted = info?.originalPrice - info?.price;
  const discount = Math.floor((discounted / info?.originalPrice) * 100);
  return <p className={`${style}`}>{'-' + discount + '%'}</p>;
});
const Products = ({ style, info}) => {
  
  const {id, description, name, price, prodimage, originalPrice, category} = info;
  const {data: reviewStats} = useSuspenseQuery(ratingsSummaryOptions(id))
  return (
    <div className={`card rounded-none rounded-t-md bg-schemes-light-surface ring-schemes-light-outline ring-none text-schemes-light-onPrimaryContainer min-w-[180px] max-w-[280px] lg:w-60  shadow-sm ${style} gap-2 h-[25rem]   pb-0 text-sm overflow-clip relative`}
>
    <Link
      href={`/home/${category?.name}/${encodeURI(name + '-' + id)}`}
    className="card"
    >
      <figure className=" h-40 w-fit overflow-y-clip rounded-none">
        <img
          src={prodimage?.image}
          alt="product image"
          className=""
        />
      </figure>
      <div className="card-body py-1 px-2 relative">
        <h2 className="card-title text-base">
          {name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <h3 className="  font-semibold flex space-x-1 items-center">
          <p>{price}</p>
          <p className=" line-through text-gray-500">{originalPrice}</p>
          <ComputeDiscount info={info} />
        </h3>
        <p className=" line-clamp-3">{description}</p>
        <RatingSum data={reviewStats} show={false}/>
      </div>
    </Link>
       <ProductActions info={info} />
         
         </div>
  );
};

export default Products;

 {/* <div className="badge badge-outline p-4">Add to cart</div> <div className="badge badge-outline p-4">Buy now</div> */}
         