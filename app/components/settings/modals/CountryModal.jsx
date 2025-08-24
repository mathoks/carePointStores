"use client";
import React from "react";
import { useAppSelector } from "@/app/lib/hooks";
import LgaList from "./modalCompo/LgaList";
import StateList from "./modalCompo/StateList";
import CountryList from "./modalCompo/CountryList";


export const CountryModal = () => {
  const { active } = useAppSelector((state) => state.shipping);

  const pages = {
    country: <CountryList />,
    lga: <LgaList />,
    state : <StateList />,
  };
  return (
    <dialog
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle  overflow-y-hidden"
    >
      {pages[active]}
    </dialog>
  );
};

export default CountryModal;
