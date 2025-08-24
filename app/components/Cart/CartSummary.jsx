import React, { memo } from "react";
import QuantityBtn from "../bottons/QuantityBtn";
import RemoveItmBtn from "../bottons/RemoveItmBtn";
import DeletePrompt from "../alert/DeletePrompt";
import SubTotal from "./SubTotal";
import Link from "next/link";
import { sortByVariantName } from "@/app/utills/utills";

const ItemCard = memo(function ItemCardMemo({ info, id }) {

  return (
    <div className="grid grid-cols-6 gap-2 text-schemes-light-onSecondaryContainer">
      <div className=" col-span-2">
        <figure className=" flex-grow-0 flex-shrink-0">
          <figcaption className=" text-md font-bold line-clamp-2">
            <Link
              className=" cursor-pointer"
              href={`/home/product/${info?.ProductID}`}
            >
              {info.variant_id
                ? info?.product_variant?.product?.name ?? info.name
                : info?.product?.name ?? info?.name}
            </Link>
          </figcaption>
          <img
            src={info?.img ?? info?.product?.prodimage?.image}
            alt="product image"
          />
        </figure>
      </div>
      <div className="col-span-3  p-2 flex flex-col space-y-4 ">
        <div className="  font-semibold text-schemes-light-onSecondaryContainer text-sm">
          <h1>
            {info.variant_id
              ? info?.product_variant?.variant_name ?? info?.variant_name
              : info?.product?.name}
          </h1>
        </div>
        <div>
          <QuantityBtn items={info?.Quantity} id={id} />
        </div>
        <div>
          <RemoveItmBtn id={id} />
        </div>
      </div>
      <div className="overflow-x-scroll">
        <span className="text-[12px] font-bold text-schemes-light-onSecondaryContainer">
         <span>&#8358;</span> {info?.Quantity * info?.Price}
        </span>
      </div>
    </div>
  );
});
const CartSummary = ({ data = [], Total }) => {    
  const List =  sortByVariantName(data).map((prop, id) => (
      <li key={id}>
        <ItemCard info={prop} id={prop?.CartItemID} />
      </li>
    ));
  return (
    <div className="flex flex-col space-y-4  relative">
      <SubTotal Total={Total}/>
      <ul className="flex flex-col space-y-2 bg-schemes-light-surface  p-4 rounded-sm">
        {List}
      </ul>

      <DeletePrompt />
    </div>
  );
};

export default CartSummary;
