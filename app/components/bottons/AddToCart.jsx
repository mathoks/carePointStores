"use client";
import {
  setActiveVariant,
  setModalOpen,
} from "@/app/lib/features/cart/cartSlice";
import { useAppDispatch, useAddToCart, useAppSelector } from "@/app/lib/hooks";
import { createItem } from "@/app/utills/utills";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { memo, useState, useEffect, useCallback } from "react";

/**
 *
 * @param {Object} props
 * @returns {React.JSX} **/
export const AddToCart = memo(function Display({
  tag,
  item,
  show,
  itemID,
  user = 'guest',
  proVariants = false,
  style = "btn-sm",
}) {
  const { variant, id, ...rest } = item;

  const dispatch = useAppDispatch();
  const currentCart = useAppSelector((state) => state.userCart.data);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentVariant = useAppSelector(
    (state) => state.userCart.currentVariant
  );

  const inCart = useAppSelector((state) => state.userCart.isInCart);
  const isLoadingCart = useAppSelector((state) => state.userCart.isLoadingCart);

  const [disablede, setIsdisabled] = useState(null);
  const {
    mutate,
    isPending,
  } = useAddToCart(user);

  const Total = Array.isArray(currentCart)
    ? currentCart.reduce((a, b) => a + b?.Quantity * b?.Price, 0)
    : item?.order_qt * item?.price;
  const quantity = currentCart.find(
    (itemm) => proVariants ? itemm.variant_id === itemID :  itemm.ProductID === itemID 
  )?.Quantity;
  
  const count =
    proVariants && pathname === "/home"
      ? currentCart
          .filter((obj) => obj?.ProductID === itemID)
          .reduce((a, b) => a + b.Quantity, 0) ?? 0
      : proVariants && pathname !== "/home"
      ? currentCart
          .filter((obj) => obj?.variant_id === itemID)
          .reduce((a, b) => a + b.Quantity, 0) ?? 0
      : currentCart.find((item) => item.ProductID === itemID)?.Quantity;

  const handleChange2 = useCallback(
    (e) => {
      const {
        dataset: { operation },
      } = e.target;

      if (!!!variant.length && !proVariants) {
        const { product, product_variant, ...rest } = currentCart.find(
          (item) => item.ProductID === itemID
        );

        // mutate({
        //   data: rest,
        //   increamentData: {
        //     id: rest.CartItemID,
        //     operation: operation,
        //   },
        // });
         mutate({
          data: {...rest, Quantity: operation === "add" ? rest.Quantity + 1 : rest.Quantity - 1},
          increamentData: {
            id: rest.CartItemID,
            operation: operation,
          },
        });
      } else if (!!variant.length && proVariants && pathname !== "/home") {
        const { product, product_variant, ...rest } = currentCart.find(
          (item) => item.variant_id === itemID
        );
      // mutate({
        //   data: rest,
        //   increamentData: {
        //     id: rest.CartItemID,
        //     operation: operation,
        //   },
        // });
         mutate({
          data: {...rest, Quantity: operation === "add" ? rest.Quantity + 1 : rest.Quantity - 1},
          increamentData: {
            id: rest.CartItemID,
            operation: operation,
          },
        });
      } else {
        dispatch(setModalOpen());
        dispatch(setActiveVariant(item));
      }
      
    },

   
    [itemID, currentCart, inCart, dispatch]
  );

  const handleClick = (e) => {
    if (tag !== "CHECKOUT" && !proVariants) {
      mutate({
        data: createItem(
          {
            ...rest,
            product_id: id,
            order_qt: 1,
            img: rest?.prodimage[0]?.image,
          },
          false
        ),
        increamentData: null,
      });
    } else if (tag !== "CHECKOUT" && proVariants && pathname !== "/home") {
      mutate({
        data: createItem(
          {
            ...variant[currentVariant],
            order_qt: 1,
            name: rest?.name,
            product_id: id,
            img: rest?.prodimage[0]?.image,
          },
          true
        ),
        increamentData: null,
      });
    } else if (tag === "CHECKOUT") {
      if(user && user !== "guest") {
      router.push(`/home/cart/${user}/complete-order`);
      }
    else  {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("return_url", "checkout");
      router.push(`/login/?${newSearchParams.toString()}/complete-order`);
    }
  }
     else {
      dispatch(setModalOpen());
      dispatch(setActiveVariant(item));
    }

  };

  const check = useCallback(
    (proVariants) => {
      if (pathname === "/home")
        return currentCart.some((itemm) => itemm.ProductID === itemID);
      else
        return currentCart.some((itemm) =>
          proVariants ? itemm.variant_id === itemID : itemm.ProductID === itemID
        );
    },
    [currentCart, itemID, pathname]
  );

  const modalEl =
    tag !== "CHECKOUT" ? (
      !check(proVariants) ? (
        <button
          id={itemID}
          onClick={handleClick}
          disabled={isPending}
          className={`${style}  flex-grow disabled:opacity-50 bg-schemes-light-primary text-schemes-light-onPrimary border-none disabled:text-gray-400 `}
        >
          {tag} {show ? `(NGN${Total})` : ""}
        </button>
      ) : (
        <div className={` items-center  px-0 w-full h-full flex`}>
          <button
            onClick={handleChange2}
            className={`text-lg ${style} disabled:opacity-50  text-schemes-light-onPrimary rounded-e-none   bg-schemes-light-primary`}
            data-operation="minus"
            disabled={isPending || isLoadingCart}
          >
            {"-"}
          </button>
          <button
            id="win"
            className={`${
              style === "btn" ? "h-[3rem]" : "h-[2rem]"
            }  grow  bg-schemes-light-primaryContainer text-sm`}
          >
            {count}
          </button>
          <button
            onClick={handleChange2}
            className={`text-lg ${style} disabled:opacity-50  text-schemes-light-onPrimary rounded-s-none   bg-schemes-light-primary`}
            data-operation="add"
            disabled={disablede || isPending || isLoadingCart}
          >
            +
          </button>
        </div>
      )
    ) : (
      <button
        id={itemID}
        onClick={handleClick}
        disabled={isPending || isLoadingCart}
        className={`${style}  flex-grow bg-schemes-light-primary text-schemes-light-onPrimary border-none disabled:opacity-50     disabled:text-gray-400 `}
      >
        {tag} {show ? `(NGN${Total})` : ""}
      </button>
    );
  useEffect(() => {
    if (!proVariants) {
      if (quantity === item?.stockQt) {
        setIsdisabled(true);
      } else setIsdisabled(false);
    } else if (proVariants && pathname === "/home") {
      const Total_variant_stockQt =
        variant.map(({ stock_qt }) => stock_qt).reduce((a, b) => a + b, 0) ?? 0;

      if (quantity === Total_variant_stockQt) {
        setIsdisabled(true);
      } else setIsdisabled(false);
    } else if (proVariants && pathname !== "/home") {
      if (quantity === variant[currentVariant]?.stock_qt) {
        setIsdisabled(true);
      } else {
        setIsdisabled(false);
      }
    }
  }, [handleChange2, currentVariant]);

  return <React.Fragment>{modalEl}</React.Fragment>;
});
