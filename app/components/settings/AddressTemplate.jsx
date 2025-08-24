import MapIcon from "@/public/icons/MapIcon";
import React, { memo } from "react";

const AddressTemplate = memo(function Template({ address, styles = '', hide = false }) {
  const { id, is_default, ...rest } = address;
  const new_address = {};
  new_address["contact_name"] = rest.contact_name;
  new_address["street"] = rest.street;
  new_address["suite_no"] = rest.suite_no;
  new_address[
    "city"
  ] = `${rest.lga} ${rest.state} ${rest.country} ${rest.zip_code}`;
  return (
    <div className={`${styles} relative  gap-0 flex  items-start pt-12 `}>
      <div className="px-4">
        <MapIcon />
      </div>
      <ul className="  flex flex-col space-y-1   font-semibold text-sm ">
        {Object.values(new_address).map((val, id) => {
          if (val !== "")
            return (
              <li
                className="first:font-light [&:nth-child(2)]:inline-   "
                key={id}
              >
                {val}
              </li>
            );
        })}
        { !hide && <li className=" pt-4 flex justify-between   text-schemes-light-onPrimaryFixedVariant">
          <button className=" font-semibold btn-sm text-base pl-0">Edit</button>
          <button className=" font-semibold btn-sm text-base pl-0">
            Delete
          </button>
        </li>
        }
      </ul>
      {is_default && <div className=" rounded-br-md bg-schemes-light-primaryContainer text-schemes-light-onPrimaryContainer absolute inset-0  h-fit p-2  py-1 font-semibold w-fit text-sm">
        Default
      </div>}
    </div>
  );
});

export default AddressTemplate;
