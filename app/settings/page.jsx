"use client";
import React from "react";
import Country from "../components/settings/Country";
import { setdisable, setPage } from "../lib/features/settings/settingsSlice";
import Settings from "../components/settings/DefauktPage";
import { makeStore } from "../lib/store";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

const Page = () => {
  const elem = useAppSelector(state=>state.settings.page)
  const dispatch = useAppDispatch()
  const handler = () => {
    dispatch(setdisable(false));
    dispatch(setPage("default"));
  };

  const handler2 = () => {
    dispatch(setdisable(true));
    dispatch(setPage("country"));
  };
  const pages = {
    default: <Settings handler2={handler2} />,
    country: <Country handler={handler} />,
  };

  return pages[elem];
};

export default Page;
