"use client"
import React from "react";
import MoreVerIcon from "@/public/icons/MoreVerIcon";
import { setModal } from "@/app/lib/features/Modal/ModalSlice";
import { useAppDispatch } from "@/app/lib/hooks";




const HomeMore = ({id}) => {
  const dispatch = useAppDispatch();
  
  const handleOpen = (e)=>{
    e.stopPropagation();   
     dispatch(setModal(id))
    
  }

  

  return (
    <button onClick={handleOpen} data-fab={id} key={id} aria-label="modal" >
        <MoreVerIcon className="text-slate-300"  data-fab={id} />  
    </button>
  );
};

export default HomeMore;
