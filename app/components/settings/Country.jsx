"use client";
import React, { memo, useMemo, useState } from "react";
import Form from "./Form";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { reset, setPage2 } from "@/app/lib/features/settings/settingsSlice";

const Country = memo(function Count({ handler }) {
  const element = useAppSelector((state)=>state.settings.page2)
  const dispatch = useAppDispatch()
  const List = useMemo(
    () => [{ name: "Nigeria", logo: "\uD83C\uDDF3\uD83C\uDDEC" }],
    []
  );

  const handleForm = (e) => {
    dispatch(setPage2({page:'form', country: e.target?.dataset?.name}));
  };
  const ListItems = useMemo(() => {
    return (
      <div className="py-8 px-4">
        {List.map((country, id) => (
          <button className="" key={id} data-name={country.name} onClick={handleForm}>
            <span className="pr-2">{country.logo}</span>
            {country.name}
          </button>
        ))}
      </div>
    );
  }, [List]);

  const Pages = {
    default: ListItems,
    form: <Form name={element?.country} />,
  };
  return (
    <div className=" min-h-[calc(100vh-200px)] overflow-y-scroll bg-white">
      <div className=" flex  border-b-2 fixed w-full p-4 bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
          onClick={()=>dispatch(reset())}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        <span>Country/region</span>
      </div>
      <div className=" mt-8">
      {Pages[element?.page]}
      </div>
     
    </div>
  );
});

export default Country;
