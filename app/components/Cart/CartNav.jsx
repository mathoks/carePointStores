"use client";
import React, { Suspense, useMemo, memo } from "react";
import ViewCartBtn from "../bottons/ViewCartBtn";
import { useAppSelector } from "@/app/lib/hooks";

const CartNav = memo(function CartNavN({ user }){
  const Total = useAppSelector((state) => state.userCart.subTotal);
  const Items = useAppSelector((state) => state.userCart.data);

  const ItemCount = useMemo(() => Items?.length, [Items]);

  return (
    <Suspense fallback={"loading..."}>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-schemes-light-primaryContainer text-schemes-light-onPrimaryContainer   z-[1] mt-3 w-52 shadow"
      >
        <div className="card-body">
          <span className="text-lg font-bold text-schemes-light-onPrimaryContainer">
            {ItemCount} Items
          </span>
          <span className=" text-schemes-light-onPrimaryContainer ">
            Subtotal: ${Total}
          </span>
          <div className="card-actions">
            <ViewCartBtn
              userId={user ?? "guest"}
              hasItem={ItemCount === 0}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
});

export default CartNav;
