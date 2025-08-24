"use client";
import { setCurrentVar } from "@/app/lib/features/cart/cartSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import React, { memo, useCallback } from "react";

const Variations = memo(function Variant({ currentVar, variants }) {
  const dispatch = useAppDispatch();
  const handleChange2 = useCallback((e) => {
    dispatch(setCurrentVar(Number(e.target.id)));
  }, [dispatch]);

  return (
    <div className="flex justify-between ">
      <div className="form-control flex flex-col max-w-[70%]">
        {Array.isArray(variants) && (
          <label className=" text-slate-400 "> Please select a variation</label>
        )}
        <ul
          onChange={handleChange2}
          tabIndex={3}
          className="flex items-center gap-x-3 text-orange-500 flex-wrap pb-0"
        >
          {variants?.length > 0
            ? variants.map((value, i) => (
                <li
                  key={i}
                  value={value?.variant_name}
                  className="tags flex gap-1 items-center cursor-pointer"
                >
                  <label
                    className={`label-text label ${
                      currentVar === i ? "text-orange-400" : "inherit"
                    }`}
                  >
                    {value?.variant_name}
                  </label>
                  <input
                    type="radio"
                    className=" radio checked:shadow-md border-schemes-light-onPrimaryFixedVariant   checked:border-none   w-[1rem] h-[1rem]  checked:bg-[orange]"
                    name="variant"
                    id={Number(`${i}`)}
                    defaultChecked={i === 0}
                  ></input>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
});

export default Variations;
