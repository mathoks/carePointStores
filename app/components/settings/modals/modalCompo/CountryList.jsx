import { setIndex } from "@/app/lib/features/settings/ShippingSlice";
import { useAppSelector } from "@/app/lib/hooks";
import { Country, CountryFlagDisplay } from "@/app/util/StatesLga";
import CloseIcon from "@/public/icons/CloseIcon";
import React from "react";

const CountryList = () => {
  return (
    <div className="modal-box bg-white rounded-t-none min-h-[calc(100vh-65px)] px-0 overflow-x-hidden">
      <div className="flex gap-2 items-center text-xl px-4">
        <form method="dialog" className="flex gap-4">
          <CloseIcon />

          <h3 className="font-bold text-xl ">Country/region</h3>
        </form>
        <div className=" divider"></div>
      </div>
      <div className="modal-action overflow-y-scroll h-[calc(100vh-200px)]">
        <form
          method="dialog"
          className=" grid grid-flow-row auto-rows-max justify-start w-full px-4 gap-4 overflow-y-scroll h-[calc(100vh-300px)"
        >
          {Country.map(({ name, logo }, id) => (
            <CountryFlagDisplay
              setCountry={setIndex}
              show={true}
              countryCode={logo}
              countryName={name}
              key={id}
            //   setValue={func.func}
            />
          ))}
          {/* if there is a button in form, it will close the modal */}
        </form>
      </div>
    </div>
  );
};

export default CountryList;
