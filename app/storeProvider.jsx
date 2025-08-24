"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./lib/store";
import { getQueryClient } from "./lib/queryClient/getQueryClient";
import { addToCart } from "./lib/features/cart/cartSlice";




export default function StoreProvider({ children }) {
  
  const storeRef = useRef();
  const queryClient = getQueryClient()
  // const q = new QueryClient()
  if (!storeRef.current) {
    storeRef.current = makeStore();
     const cartCache = queryClient.getQueryCache()
    if(cartCache){
   
    cartCache.subscribe((event)=>{
      const {query: {queryKey, state}} = event
      
      if(queryKey[0] === 'cart'){
       
        // if(!!state?.data)storeRef.current.dispatch(addToCart(state?.data.cart_item));
      }
    })
  }
    // storeRef.current.dispatch(setPath(router))
   
    //     console.log(state)
            // const handleChange=()=>{
            //     fetchCartData()
            //       .then((data) => {
            //         console.log(data)
            //        return storeRef.current.dispatch(setData(data))
            //       })
            //       .catch((err) => console.log(err))
            //       .finally(() => console.log('done'));
                
            // }
           

            // storeRef.current.subscribe((state = storeRef.current.getState()) => {
            //         const Total = state.userCart.data.reduce((a,b)=> a + (b.quantity * b.price), 0)
            //         storeRef.current.dispatch(setTotal(Total))
                  
            // })

            // handleChange()
          //  storeRef.current.dispatch(setNav(false))
    //     }
    //     else {}
    // })
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
