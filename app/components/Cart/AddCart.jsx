"use client";
import React, {  } from "react";
import CallIcon from "../../../public/icons/CallIcon";
import { AddToCart } from "../bottons/AddToCart";
import { useAppSelector } from "@/app/lib/hooks";
import { is } from "immutable";
import Variations from "../bottons/Variations";
import { useSession } from "next-auth/react";

const AddCart = ({ variants }) => {
  const currentVar = useAppSelector((state) => state.userCart.currentVariant);
  const {variant} = variants
  const data = useSession()
  // const itemID = Array.isArray(variants)
  //   ? variants[currentVar]?.id
  //   : variants?.id;
  
const itemID = !!variant?.length
    ? variant[currentVar]?.id
    : variants?.id;
console.log(!!variant?.length
    ? variant[currentVar]?.id
    : variants?.id)
  return (
    <div className="flex flex-col space-y-4">
      <Variations currentVar={currentVar} variants={variant} />
      <div className="flex items-center w-full  justify-between gap-2 py-4">
        <div className="border border-schemes-light-outline btn bg-schemes-light-primaryContainer  text-schemes-light-onPrimaryContainer">
          <CallIcon fillcol={"#68548e"} />
        </div>

        <AddToCart
          tag={"ADD TO CART"}
          item={variants}
          show={false}
          itemID={itemID}
          style={"btn"}
          proVariants={!!variant?.length}
          user= { data?.data?.user?.id ?? 'guest'}
        />
        {/* } */}
      </div>
    </div>
  );
};

export default AddCart;
