"use client";
import CloseIcon from "@/public/icons/CloseIcon";
import React, { memo, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import { setStateIndex } from "@/app/lib/features/settings/ShippingSlice";
import LocationState from "../../LocationState";
import { Country } from "@/app/util/StatesLga";

const Statebtn = memo(function StateBtn({ state, setStates, index, dispatch }) {
  const handleStateUpdate = () => {
    const stateIndex = Country[index]?.state.findIndex(
      (states) => states.name === state
    );
    dispatch(setStates(stateIndex));
  };

  return (
    <button className=" text-left" onClick={handleStateUpdate}>
      {state}
    </button>
  );
});

const StateList = () => {
  const { index, stateIndex, lgaIndex } = useAppSelector(
    (state) => state.shipping
  );

  const [states, setStatesFilterd] = useState([...Country[index].state]);
  const dispatch = useAppDispatch();
  const handlefilter = (e) => {
    if (e.target.value === "") {
      setStatesFilterd([...Country[index].state]);
    } else {
      setStatesFilterd([
        ...states.filter(({ name }) =>
          name.toLowerCase().includes(e.target.value.toLowerCase())
        ),
      ]);
    }
  };
  return (
    <div
      id="my_modal_1"
      className="modal-box bg-white rounded-t-none min-h-[calc(100vh-65px)] px-0 overflow-y-hidden text-sm md:text-base"
    >
      <div className=" grid grid-flow-row gap-1 px-4  space-y-4 pb-4 border-b">
        <form method="dialog" className="flex gap-8 ">
          <CloseIcon />

          <span className=" text-sm">Please select</span>
        </form>
        <label className="grid grid-flow-row px-0 gap-1">
          <input
            onChange={handlefilter}
            placeholder="Quick search"
            type="search"
            className="bg-schemes-light-background input-sm border "
          />

          <pre className=" text-wrap tracking-tighter text-sm">
            send us a message if you notice any discrepancy
          </pre>
        </label>
        <div>
          <LocationState
            stage={2}
            selected={[
              Country[index].state[stateIndex].name,
              Country[index]?.state[stateIndex].LGAs[lgaIndex],
            ]}
          />
        </div>
      </div>
      <form
        method="dialog"
        className=" grid py-4 grid-flow-row auto-rows-max justify-start w-full px-8 gap-4  overflow-y-scroll h-[calc(100vh-300px)]"
      >
        {states.map((state, id) => (
          <Statebtn
            index={index}
            state={state.name}
            setStates={setStateIndex}
            key={id}
            dispatch={dispatch}
          />
        ))}
      </form>
    </div>
  );
};

export default StateList;
