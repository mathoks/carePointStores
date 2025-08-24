"use client"
import { useAppSelector } from "@/app/lib/hooks";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const SettingsNav = () => {
    const pathname = usePathname()
    const path = pathname.split("/")
    const router = useRouter()
    const disabled = useAppSelector(state=>state.settings.disabled) 
    
    const handler = (e)=>{
    
        if(disabled) return;
        
        else if(path[path.length - 1] === 'profile'){
          router.push('/settings')
        }
        else if(path[path.length - 1] === 'settings'){
          router.push('/home')
        }
       else  history.back();
    }

  return (
    <div className=" navbar fixed w-full text-schemes-light-onPrimary bg-schemes-light-surfaceTint top-0">
      <div className="flex gap-2 items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke={"currentColor"}
          className={`size-6 ${disabled ? "opacity-50" : "opacity-100"}`}
          onClick={handler}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
     
      <div>
        <p className={`font-medium first-letter:uppercase ${disabled ? "opacity-50" : "opacity-100"}`}>{path[path.length - 1]}</p>
      </div>
      </div>
    </div>
  );
};

export default SettingsNav;
