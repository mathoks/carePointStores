// "use client";
// import React, { useState } from "react";
// import CallIcon from "../../../public/icons/CallIcon";
// import { AddToCart } from "../bottons/AddToCart";
// import ItemSum from "../ItemSum";
// import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
// import { addToCart, Increament, setCurrentVar } from "@/app/lib/features/cart/cartSlice";
// import { is } from "immutable";

// function compareFunction(data = [], item = {}){
// return data.some(item => is(item, item))
// }

// function upDateItem(data = [], item = {}, dispatch, operation){

// }
// const AddCart = ({ variants }) => {
//   const currentVar = useAppSelector(state => state.userCart.currentVariant)
//   const currenCart = useAppSelector(state => state.userCart.data)
//   const dispatch = useAppDispatch()
//   const [items, setItems] = useState(() => {
//     if (Array.isArray(variants))
//        return [{ ...variants[currentVar], order_qt: 1  }];
//       return { ...variants, order_qt: 1};
//   });

  

//   const handleQuantityChange = (operation) => {
    
//     if (Array.isArray(variants)) {
//       setItems((prevItems) => {
//         const updatedItems = [...prevItems];
//         const itemIndex = updatedItems.findIndex(
//           (item) => item.id === variants[currentVar].id
//         );

//         if (itemIndex >= 0) {
//           const item = updatedItems[itemIndex];
         
         
//           if (operation === "minus" && item.order_qt > 0) {
            
           
//             item.order_qt--;
//           } else if (operation === "add") {
           
//            compareFunction(currenCart, item) ? 
//            dispatch(Increament({id: item.id, operation: 'add'}))
//            : item.order_qt++;
//           }
//         } else if (itemIndex < 0 && operation === "add") {
//           const newItem = { ...variants[currentVar], ...{ order_qt: 1 } };
//           return [...updatedItems, newItem];
//         }

        
//          return [...updatedItems ];
//       });
//       console.log(items)
//     }
//     else {
     
//       setItems((prev)=>{
//         const updatedItems = {...prev}
//         if (operation === 'minus' && updatedItems.order_qt > 0){
//           return { ...updatedItems, ...{order_qt: prev.order_qt - 1} }
//         }
//         else if(operation === 'add' && updatedItems.order_qt < variants.stockQt){
//           return { ...updatedItems, order_qt: prev.order_qt + 1 }
//         }
//         else return updatedItems;
//       })
//   };
//   }
//   const handleChange2 = (e) => {
//     dispatch(setCurrentVar(e.target.id));
   
//   };
//   return (
//     <div className="flex flex-col space-y-4">
//       <div className="flex justify-between ">
//         <div className="form-control flex flex-col max-w-[70%]">
//           {Array.isArray(variants) && (
//             <label className=" text-slate-400 ">Variations:</label>
//           )}
//           <ul
//             onChange={handleChange2}
//             tabIndex={3}
//             className="flex items-center gap-x-3 text-orange-500 flex-wrap pb-0"
//           >
//             {variants?.length > 0
//               ? variants.map((value, i) => (
//                   <li
//                     key={i}
//                     value={value?.variant_name}
//                     className="flex gap-1 label cursor-pointer"
//                   >
//                     <span className=" label-text">{value.variant_name}</span>
//                     <br></br>
//                     <input
//                       type="radio"
//                       className="tags radio checked:shadow-md   w-[1rem] h-[1rem]  checked:bg-[orange]"
//                       name="variant"
//                       id={Number(`${i}`)}
//                       defaultChecked={i === 0}
//                     ></input>
//                   </li>
//                 ))
//               : null}
//           </ul>
//         </div>
//         <div className={`${!variants.length ? 'flex py-2 items-center' : 'flex flex-col items-center space-y-2'}`}>
//           <div className=" text-slate-400 ">Quantity:</div>
//           <div className="flex items-center  px-2">
//             <button
//               onClick={() => handleQuantityChange("minus")}
//               className=" text-lg btn-sm  text-schemes-light-onPrimary   bg-schemes-light-primary rounded-s-sm"
//               disabled ={Array.isArray(variants) ? items[currentVar]?.order_qt === 0 : items?.order_qt === 0}

//             >
//               -
//             </button>
//             <button
//               id="win"
//               className="  p-1.5 w-10 px-2.5 bg-schemes-light-primaryContainer text-sm"
//             >
//               {Array.isArray(variants)
//                 ? items.find(
//                     (obj) =>
//                       obj?.variant_name === variants[currentVar]?.variant_name
//                   )?.order_qt ?? 0
//                 : items?.order_qt}
//             </button>
//             <button
//               onClick={() => handleQuantityChange("add")}
//               className=" text-lg  text-schemes-light-onPrimary  btn-sm bg-schemes-light-primary  rounded-e-sm"
//                disabled ={Array.isArray(variants) ? items[currentVar]?.order_qt === variants[currentVar]?.stock_qt  : items?.order_qt === variants.stockQt}

//             >
//               +
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* <ItemSum item={items} setItem={setItems} /> */}
//       <div className="flex items-center w-full justify-between gap-2 py-4">
//         <div className="border border-schemes-light-outline btn bg-schemes-light-primaryContainer  text-schemes-light-onPrimaryContainer">
//           <CallIcon fillcol={"#230f46"} />
//         </div>

//         <AddToCart
//           tag={"ADD TO CART"}
//           item= {items}
//           active={Array.isArray(variants) ? items.filter(({order_qt})=> order_qt === 0).length  === items?.length : items?.order_qt === 0}
//           dispatch={dispatch}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddCart;


"use client";
import React, { useState } from "react";
import CallIcon from "../../../public/icons/CallIcon";
import { AddToCart } from "../bottons/AddToCart";
import ItemSum from "../ItemSum";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { addToCart, Increament, setCurrentVar } from "@/app/lib/features/cart/cartSlice";
import { is } from "immutable";

function compareFunction(data = [], item = {}){
return data.some(item => is(item, item))
}

function upDateItem(data = [], item = {}, dispatch, operation){

}
const AddCart = ({ variants }) => {
  const currentVar = useAppSelector(state => state.userCart.currentVariant)
  const currenCart = useAppSelector(state => state.userCart.data)
  const dispatch = useAppDispatch()
  // const [items, setItems] = useState(() => {
  //   if (Array.isArray(variants))
  //      return [{ ...variants[currentVar], order_qt: 1  }];
  //     return { ...variants, order_qt: 1};
  // });

  

  // const handleQuantityChange = (operation) => {
    
  //   if (Array.isArray(variants)) {
  //     setItems((prevItems) => {
  //       const updatedItems = [...prevItems];
  //       const itemIndex = updatedItems.findIndex(
  //         (item) => item.id === variants[currentVar].id
  //       );

  //       if (itemIndex >= 0) {
  //         const item = updatedItems[itemIndex];
         
         
  //         if (operation === "minus" && item.order_qt > 0) {
            
           
  //           item.order_qt--;
  //         } else if (operation === "add") {
           
  //          compareFunction(currenCart, item) ? 
  //          dispatch(Increament({id: item.id, operation: 'add'}))
  //          : item.order_qt++;
  //         }
  //       } else if (itemIndex < 0 && operation === "add") {
  //         const newItem = { ...variants[currentVar], ...{ order_qt: 1 } };
  //         return [...updatedItems, newItem];
  //       }

        
  //        return [...updatedItems ];
  //     });
  //     console.log(items)
  //   }
  //   else {
     
  //     setItems((prev)=>{
  //       const updatedItems = {...prev}
  //       if (operation === 'minus' && updatedItems.order_qt > 0){
  //         return { ...updatedItems, ...{order_qt: prev.order_qt - 1} }
  //       }
  //       else if(operation === 'add' && updatedItems.order_qt < variants.stockQt){
  //         return { ...updatedItems, order_qt: prev.order_qt + 1 }
  //       }
  //       else return updatedItems;
  //     })
  // };
  // }
  const handleChange2 = (e) => {
    dispatch(setCurrentVar(e.target.id));
  };
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between ">
        <div className="form-control flex flex-col max-w-[70%]">
          {Array.isArray(variants) && (
            <label className=" text-slate-400 ">Variations:</label>
          )}
          <ul
            onChange={handleChange2}
            tabIndex={3}
            className="flex items-center gap-x-3 text-orange-500 flex-wrap pb-0"
          >
            {variants?.length > 0
              ? variants.map((value, i) => (
                  <li
                    key={i}
                    value={value?.variant_name}
                    className="flex gap-1 label cursor-pointer"
                  >
                    <span className=" label-text">{value.variant_name}</span>
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
              : null}
          </ul>
        </div>
        <div className={`${!variants.length ? 'flex py-2 items-center' : 'flex flex-col items-center space-y-2'}`}>
          <div className=" text-slate-400 ">Quantity:</div>
          <div className="flex items-center  px-2">
            <button
              onClick={() => handleQuantityChange("minus")}
              className=" text-lg btn-sm  text-schemes-light-onPrimary   bg-schemes-light-primary rounded-s-sm"
              // disabled ={Array.isArray(variants) ? items[currentVar]?.order_qt === 0 : items?.order_qt === 0}

            >
              -
            </button>
            <button
              id="win"
              className="  p-1.5 w-10 px-2.5 bg-schemes-light-primaryContainer text-sm"
            >
              {Array.isArray(variants)
                ? currenCart.find(
                    (obj) =>
                      obj?.variant_name === variants[currentVar]?.variant_name
                  )?.order_qt ?? 0
                : currenCart?.order_qt}
            </button>
            <button
              onClick={() => handleQuantityChange("add")}
              className=" text-lg  text-schemes-light-onPrimary  btn-sm bg-schemes-light-primary  rounded-e-sm"
              //  disabled ={Array.isArray(variants) ? items[currentVar]?.order_qt === variants[currentVar]?.stock_qt  : items?.order_qt === variants.stockQt}

            >
              +
            </button>
          </div>
        </div>
      </div>
      {/* <ItemSum item={items} setItem={setItems} /> */}
      <div className="flex items-center w-full justify-between gap-2 py-4">
        <div className="border border-schemes-light-outline btn bg-schemes-light-primaryContainer  text-schemes-light-onPrimaryContainer">
          <CallIcon fillcol={"#230f46"} />
        </div>

        <AddToCart
          tag={"ADD TO CART"}
          item= {variants[currentVar]}
          // active={Array.isArray(variants) ? items.filter(({order_qt})=> order_qt === 0).length  === items?.length : items?.order_qt === 0}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
};

export default AddCart;
