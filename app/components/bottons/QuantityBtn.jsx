"use client";
import { useAddToCart, useAppSelector } from "@/app/lib/hooks";
import React, { useState, useCallback, useEffect } from "react";
import MinusIcon from "../../../public/icons/MinusIcon";
import AddIcon from "../../../public/icons/AddIcon";
import { useSession } from "next-auth/react";

const QuantityBtn = ({ items, id }) => {
  const { data } = useSession();
  const [disableAdd, setDisableAdd] = useState(false);
  const currentCart = useAppSelector((state) => state.userCart.data);
  const { mutate, isSuccess, isPending } = useAddToCart(
    data?.user?.id ?? "guest"
  );
  const { product, product_variant, ...rest } = currentCart.find(
    (item) => item.CartItemID === id
  );

  const handleChange2 = useCallback(
    (e) => {
      const {
        dataset: { operation },
      } = e.target;
      mutate({
        data: {
          ...rest,
          Quantity: operation === "add" ? rest.Quantity + 1 : rest.Quantity - 1,
        },
        increamentData: { operation: operation, id: id },
      });
      console.log(isPending, "pending", disableAdd);
    },
    [id, isPending, mutate, rest]
  );

  useEffect(() => {
    if (rest.Quantity === rest.stockQuantity) {
      setDisableAdd(true);
      console.log(disableAdd);
    } else setDisableAdd(false);
  }, [disableAdd, handleChange2, rest.Quantity, rest.stockQuantity]);
  return (
    <div>
      <div className="flex items-center w-fit  border border-gray-500 bg-schemes-light-primaryContainer rounded-md px-[3.5px]">
        <button
          onClick={handleChange2}
          className="border-none   btn-sm  rounded-none  btn bg-schemes-light-primaryContainer text-schemes-light-onPrimaryContainer"
          disabled={isPending}
          data-operation="minus"
        >
          <MinusIcon operation="minus" />
        </button>
        <button
          id="win"
          className={` w-10 h-8  px-3 ${
            disableAdd
              ? " text-orange-500"
              : "text-schemes-light-onSecondaryContainer"
          }   text-sm bg-schemes-light-surface`}
        >
          {items}
        </button>
        <button
          onClick={handleChange2}
          className="border-none btn text-lg text-schemes-light-onPrimaryContainer disabled:opacity-50  btn-sm bg-schemes-light-primaryContainer  rounded-none"
          disabled={isPending || disableAdd}
          data-operation="add"
        >
          <AddIcon operation="add" />
        </button>
      </div>
    </div>
  );
};

export default QuantityBtn;
