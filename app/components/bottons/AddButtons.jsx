"use client";
import {
  addToCart,
  setCurrentVar,
  Increament,
  setInCart,
} from "@/app/lib/features/cart/cartSlice";
import { useAddToCart, useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { createItem } from "@/app/utills/utills";
import { useSession } from "next-auth/react";
import React, { memo, useEffect, useId, useState } from "react";

const AddButtons = memo(function AddButs({
  item: { variant, ...item },
  variant_name,
  hasVariant,
  variant_id,
  id = 0,
  style = "btn-sm",
}) {
  const dispatch = useAppDispatch();
  const { data } = useSession();
  const ids = useId();
  const [idd, setIDd] = useState(0);
  const currentId = useAppSelector((state) => state.userCart.currentVariant);
  const { mutate, isPending } = useAddToCart(data?.user?.id ?? 'guest');
  const [disabled, setIsdisabled] = useState(
    hasVariant ? Array(variant.length).fill([true, false]) : [true, false]
  );
  // console.log(disabled)
  const cartItems = useAppSelector((state) => state.userCart.data);
  const inCart = cartItems.findIndex((itemm) =>
    hasVariant ? itemm.variant_id === variant_id : itemm.id === variant_id
  );
  const quantity = hasVariant
    ? cartItems.find((obj) => obj?.variant_id === variant_id)?.Quantity ?? 0
    : cartItems.find((item) => item.id === variant_id)?.Quantity;

  const handleChange2 = (e) => {
    const {
      id,
      dataset: { operation },
    } = e.target;
    dispatch(setCurrentVar(id));

    if (inCart === -1 && operation === "add") {
      const newEntry = createItem(
        { ...variant[id], name: item.name, img: item?.prodimage[0]?.image ,  order_qt: 1},
        hasVariant
      );
      mutate({
        data: newEntry,
        increamentData: {
          id: newEntry?.CartItemID,
          operation: operation,
          //  idProd: newEntry?.CartItemID,
          first_entry: inCart === -1
        },
        dualAction: true,
      });
    } else {
      const { product, product_variant, ...rest } = cartItems[inCart];
      mutate({
        data: {...rest, Quantity: operation === "add" ? rest.Quantity + 1 : rest.Quantity - 1},
        increamentData: {
          id: cartItems[inCart]?.CartItemID,
          operation: operation,
        },
      });
    }
  };

  useEffect(() => {
    if (!!cartItems.length) setIDd(ids);
  }, [cartItems]);

  useEffect(() => {
    if (hasVariant) {
      if (quantity < variant[id]?.stock_qt) {
        
        if (quantity > 0) {
          
          setIsdisabled((prev) => {
            prev[id] = [false, false];
            return [...prev];
          });
        } else {
          
          setIsdisabled((prev) => {
            prev[id][0] = true;
            return [...prev];
          });
        }
      } else {
        setIsdisabled((prev) => {
          prev[id][1] = true;
          return [...prev];
        });
      }
    } else {
      if (quantity < item?.stockQt && quantity > 0) {
        setIsdisabled((prev) => {
          prev = [false, false];
          return [...prev];
        });
      } else if (quantity < item?.stockQt && quantity === 0) {
        setIsdisabled((prev) => {
          prev[0] = true;
          return [...prev];
        });
      } else {
        setIsdisabled((prev) => {
          prev[1] = true;
          return [...prev];
        });
      }
    }
    return () => {
      dispatch(setCurrentVar(0));
      setIsdisabled(new Array(3).fill([false, false]));
    };
  }, [quantity, idd, id, variant, hasVariant, ]);

  return (
    <div className="flex items-center  px-0 w-full h-full">
      <button
        onClick={handleChange2}
        className={`text-lg ${style}  w-[3.5rem] text-schemes-light-onPrimary rounded-e-none   bg-schemes-light-primary disabled:opacity-50   `}
        id={id}
        data-operation="minus"
        disabled={isPending || hasVariant ? disabled[id][0] : disabled[0]}
      >
        -
      </button>
      <button
        id="win"
        className="  h-[2rem] grow  bg-schemes-light-primaryContainer text-sm"
      >
        {quantity}
      </button>
      <button
        onClick={handleChange2}
        className={`text-lg ${style} disabled:opacity-50 w-[3.5rem] text-schemes-light-onPrimary rounded-e-none   bg-schemes-light-primary `}
        id={id}
        data-operation="add"
        disabled={isPending || hasVariant ? disabled[id][1] : disabled[1]}
      >
        +
      </button>
    </div>
  );
});

export default AddButtons;
