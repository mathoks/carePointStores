"use client";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import CloseIcon from "@/public/icons/CloseIcon";
import AddButtons from "./AddButtons";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import { setModalOpen } from "@/app/lib/features/cart/cartSlice";
import { useRouter } from "next/navigation";

const VariantDrawer = memo(function Drawer({userId}) {
  const prod_variants = useAppSelector((state) => state.userCart.curVariant);
  const {variant = []} = prod_variants;
  const currentCart = useAppSelector((state) => state.userCart.data);
  const modal = useAppSelector((state) => state.userCart.modalOpen);
  const router = useRouter()
  const dispatch = useAppDispatch()
  const quantity =
    currentCart
      .filter((obj) => obj?.ProductID === variant[0]?.product_id)
      .reduce((a, b) => a + b.Quantity, 0) ?? 0;
  
  const handler = ()=>{
    dispatch(setModalOpen())
    router.push(`/home/cart/${userId ?? 'guest'}`);
    
  }

  return (
      <dialog id="my_modal_5" className="modal  modal-bottom sm:modal-middle " open={modal}>
      <div className="modal-box bg-schemes-light-primaryFixedDim">
      <div className="flex justify-between p-2 pb-0 font-medium">
        <p>Please select a variation</p>
        <CloseIcon close={setModalOpen}/>
      </div>
      <div className="modal-action justify-stretch block">
      <div className="flex justify-between row-span-2">
        <ul tabIndex={3} className="flex flex-col space-y-2 w-full">
          {!!variant?.length && (
            variant?.map((value, i) => (
              <div key={i} id={value?.id} className="flex flex-col space-y-4">
                <li
                  key={i}
                  value={value?.variant_name}
                  className="grid grid-cols-5 "
                >
                  <div className="flex flex-col space-y-1 col-span-2">
                    <p className=" text-base text-schemes-light-onPrimaryFixed font-semibold">
                      {value?.variant_name}:
                    </p>
                    <span className="font-semibold text-sm">
                      <span>&#8358;</span>
                      {value?.price}
                    </span>
                  </div>

                  <div className=" col-span-3">
                    <AddButtons
                      item={prod_variants}
                      variant_name={value?.variant_name}
                      hasVariant={true}
                      variant_id={value?.id}
                      id={Number(`${i}`)}
                      modal = {modal}
                    />
                  </div>
                </li>
                <hr className="w-full" />
              </div>
            ))
          )}
        </ul>
      </div>
      <div className="flex justify-between gap-4 pt-8 row-span-3">
        <button className="btn bg-inherit grow text-inherit">
          Continue Shopping
        </button>
        <button
          disabled={quantity === 0}
          className="btn grow bg-schemes-light-primary text-schemes-light-onPrimary disabled:text-schemes-light-secondary  "
          onClick={handler}
        >
          Go to Cart
        </button>
      </div>
      {/* </form> */}
      </div> 
      </div>
      </dialog>
    // </div>
  );
});
export default VariantDrawer;

// useEffect(() => {
//   const handleClickOutside = (e) => { 
//     if(drawerRef.current && !drawerRef.current.contains(e.target)) {
//         if(Open){
//         dispatch(setModalOpen())
//         }
//     }
//   }
//   document.addEventListener('click', handleClickOutside)
//   return () => {
//     document.removeEventListener('click', handleClickOutside)
//   }
// }, [Open])