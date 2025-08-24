"use client";

import React, { memo } from "react";
import Link from "next/link";

const ViewCartBtn = memo(function ViewCart({userId, hasItem}){
  return (
    <button disabled = {hasItem} className="btn  bg-schemes-light-primary text-schemes-light-onPrimary  border-none btn-block disabled:bg-schemes-light-primary disabled:text-schemes-light-onPrimary ">
      <Link href={`/home/cart/${userId}`}>{hasItem ? 'Cart empty' :'View cart'}</Link>
    </button>
  );
});

export default ViewCartBtn;
