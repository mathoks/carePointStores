import { States } from "@/app/util/StatesLga";
import React from "react";

const State = ({ setState }) => {
  const handleChange = (e) => {
    setState(e?.target?.value);
  };
  return (
    // eslint-disable-next-line jsx-a11y/role-supports-aria-props
    <>
      <label htmlFor="select1">
        <select
          id="select1"
          onChange={handleChange}
          className="select select-bordered w-full bg-white"
        >
          <option disabled selected>
            Choose Your Location
          </option>
          {States.map((value, i) => (
            <option value={value} key={i}>
              {value}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

export default State;
