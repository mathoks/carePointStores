import React, { memo } from 'react'

const LocationState = memo(function LocationSel({ selected = [], stage = 1 }) {
        if (stage === 1) {
          return (
            <ul className=" inline-grid grid-flow-row gap-[1.24rem] after:content-[''] after:h-[2.17rem] after:w-[0.1rem] relative after:bg-gray-400   after:top-[1rem]    after:absolute   after:start-[7px]">
              {selected.map((val, id) => (
                <li
                  key={id}
                  className={`odd:text-schemes-light-surfaceTint even:text-inherit after:content-[''] after:inset-2   after:start-[4px]  after:border after:rounded-full after:h-2 after:w-2 after:even:bg-gray-400 after:odd:outline-2 after:odd:outline-offset-4 after:odd:outline-schemes-light-onPrimaryFixed after:odd:bg-schemes-light-surfaceTint  relative after:absolute pl-4`}
                >
                  {val}
                </li>
              ))}
            </ul>
          );
        } else
          return (
            <ul className=" inline-grid grid-flow-row gap-[1.24rem] after:content-[''] after:h-[2.17rem] after:w-[0.1rem] relative after:bg-gray-400   after:top-[1rem]    after:absolute   after:start-[7px]">
              {selected.map((val, id) => (
                <li
                  key={id}
                  className={`even:text-schemes-light-surfaceTint even:after:bg-schemes-light-surfaceTint odd:text-inherit after:content-[''] after:inset-2   after:start-[4px]  after:border after:rounded-full after:h-2 after:w-2 after:odd:bg-gray-400 after:odd:outline-2 after:odd:outline-offset-4 after:odd:outline-schemes-light-onPrimaryFixed   relative after:absolute pl-4`}
                >
                  {val}
                </li>
              ))}
            </ul>
          );
      });


export default LocationState
