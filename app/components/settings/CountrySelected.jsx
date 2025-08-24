"use client";
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

const CountrySelected = () => {
  const [country, setcountry] = useState(null);
  useEffect(() => {
    const Country = localStorage.getItem("country");
    setcountry(JSON.parse(Country));
  }, []);

  return (
    <span className=" flex gap-x-2 items-center">
      <ReactCountryFlag countryCode={"NG"} svg />
      <span>{country?.lga}</span>
    </span>
  );
};

export default CountrySelected;
