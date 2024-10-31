import { lgaList } from "@/app/util/StatesLga";
import React from "react";

const City = ({ state }) => {
  const Options = Object.keys(lgaList).find((name) => name === state);

  return (
    <select className="select select-bordered w-full bg-white">
      <option disabled selected>
        Choose Your City
      </option>
      {Options !== null
        ? lgaList[Options]?.map((location, id) => (
            <option key={id}>{location}</option>
          ))
        : null}
    </select>
  );
};

export default City;
