"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./lib/store";



export default function StoreProvider({ children }) {
  
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // storeRef.current.dispatch(setPath(router))
    // storeRef.current.subscribe((state = storeRef.current.getState()) => {
    //     console.log(state)
    //     if(state?.nav?.path  !== '/' && state?.nav?.nav === true){
    //         notify()
    //       //  storeRef.current.dispatch(setNav(false))
    //     }
    //     else {}
    // })
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
