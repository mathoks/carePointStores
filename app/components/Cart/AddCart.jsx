"use client";
import React, {  useState } from "react";
import CallIcon from "../../../public/icons/CallIcon";
import { AddToCart } from "../bottons/AddToCart";
import ItemSum from "../ItemSum";

const AddCart = ({
  variants = [
    {id:1, tag: "20ml", price: "400", quantity: 50 },
    {id:2, tag: "50ml", price: "800", quantity: 3 },
    { id:5, tag: "100ml", price: "500", quantity: 80 },
    { id:6, tag: "80ml", price: "800", quantity: 3 }
  ],
}) => {
  const [currentVar, setcurrentVar] = useState(0);
  const [items, setItems] = useState([
    { ...variants[currentVar], ...{ quantityReq: 1 } },
  ]);

//   const handleChange = (e) => {
//     if (e.target.id === "minus") {
//       setItems((prev) => {
//          const item =  prev.find((en)=> en.tag === variants[currentVar].tag)
//         item?.quantityReq > 0 ? item.quantityReq-- : item?.quantityReq ?? 0
//           return [...prev];
//       });
//     }
//     if (e.target.id === "add") {
//       setItems((prev) => {
//         const item =  prev.find((en)=> en.tag === variants[currentVar].tag)
//         if(item) {
//              item.quantityReq++;
//         }
//      else {
//        const newItem = {...variants[currentVar], ...{ quantityReq: 1 } };
//        return [...prev, ...[newItem]]
        
//     };
//         return [...prev];
//       });
      
//     }
    
//   };

const handleQuantityChange = (operation) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems]; 
      const itemIndex = updatedItems.findIndex(
        (item) => item.tag === variants[currentVar].tag
      );

      if (itemIndex >= 0) {
        const item = updatedItems[itemIndex];
        if (operation === "minus" && item.quantityReq > 0) {
          item.quantityReq--;
        } else if (operation === "add") {
          item.quantityReq++;
        }
      }
      else if(itemIndex < 0 && operation === "add"){
               const newItem = {...variants[currentVar], ...{ quantityReq: 1 } };
               return [...updatedItems, ...[newItem]]
                
            };

      return updatedItems;
    });
  };



  const handleChange2 = (e) => {
    const newEntry = { ...variants[e.target.id], ...{ quantityReq: 1 } }; 
    setcurrentVar(e.target.id)
    
    if (
      items.length <= variants.length &&
      !items.find((obj) => obj.tag === newEntry.tag)
    ) {
      setItems((prev) => [...prev, ...[newEntry]]);
      
    }
    
    
  };
    
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between ">
        <div className="form-control flex flex-col max-w-[70%]">
          <label className=" text-slate-400 ">Variations:</label>
          <ul
            onChange={handleChange2}
            tabIndex={3}
            className="flex items-center gap-x-3 text-orange-500 flex-wrap pb-0"
          >
            {variants.length > 0
              ? variants.map((value, i) => (
                  <li
                    key={i}
                    value={value.tag}
                    className="flex gap-1 label cursor-pointer"
                  >
                    <span className=" label-text">{value.tag}</span>
                    <br></br>
                    <input
                      type="radio"
                      className="tags radio checked:shadow-md   w-[1rem] h-[1rem]  checked:bg-[orange]"
                      name="variant"
                      id={Number(`${i}`)}
                      defaultChecked={i === 0}
                    ></input>
                  </li>
                ))
              : "pop"}
          </ul>
        </div>
        <div>
          <div className=" text-slate-400 ">Quantity:</div>
          <div className="flex items-center gap-1 text-orange-500 px-1">
            <button
              onClick={()=>handleQuantityChange("minus")}
              className="border border-orange-500 text-white text-lg btn-sm bg-orange-500 rounded-sm"
            >
              -
            </button>
            <button id="win" className="outline-orange-500 border shadow-md p-1.5 px-2.5 border-orange-500 text-sm">
              {items.find((obj) => obj.tag === variants[currentVar].tag)?.quantityReq ?? 0}
            </button>
            <button
              onClick={()=>handleQuantityChange("add")}
              className="border text-lg border-orange-500 text-white btn-sm bg-orange-500 rounded-sm"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <ItemSum item={items} setItem={setItems} />
      <div className="flex items-center w-full justify-between gap-2 py-4">
        <div className="border border-orange-400 btn bg-white">
          <CallIcon fillcol={"orange"} />
        </div>

        <AddToCart tag={"ADD TO CART"} />
      </div>
    </div>
  );
};

export default AddCart;
