"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ProductList } from "../utills/utills";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Tabs = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );
  const { replace } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.innerText === "All-categories") {
      params.set("category", e.target.innerText.toLowerCase());
      replace(`/${pathname?.split("/")[1]}?${params.toString()}`);
    } else {
      params.set("category", e.target.innerText.toLowerCase());
      // replace(
      //   `/${pathname?.split("/")[1]}/${e.target.innerText}?${params.toString()}`
      // );
      replace(`/${pathname?.split("/")[1]}/?${params.toString()}`);
    }
  };

  useEffect(() => {
    document.querySelectorAll(".tag-btn").forEach((btn) => {
      if (
        !pathname.includes("search") &&
        pathname === "/home" &&
        params.get("category") === null
      ) {
        params.set("category", "all-categories");
        replace(`/${pathname?.split("/")[1]}?${params.toString()}`);
      }
     
      if (btn.textContent.toLocaleLowerCase() === params.get("category")) {
       
        btn.classList.add("active");
        btn.scrollIntoView();
      } else {
        btn.classList.remove("active");
      }
    });
  }, [pathname, params, replace]);

  // <-- scope is for selector text (optional)

  return (
    <div className="text-schemes-light-onPrimary z-50 bg-schemes-light-surfaceTint ">
      <div className="grid grid-flow-col auto-cols-auto items-center gap-2 px-2">
        <div className="flex gap-2 md:gap-6 p-4 mr-2 overflow-scroll scrolling text-sm">
          {ProductList.map((val, i) => {
            if (i === 0)
              return (
                <button
                  key={i}
                  onClick={(e) => handleClick(e, val)}
                  className="tag-btn text-nowrap hover:link-primary cursor-pointer hover:underline flex gap-1 items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6h.008v.008H6V6Z"
                    />
                  </svg>
                  {val}
                </button>
              );
            return (
              <button
                key={i}
                onClick={(e) => handleClick(e, val)}
                className="tag-btn text-nowrap hover:link-primary cursor-pointer hover:underline "
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>
      {/* <div className=' divider  absolute w-full bottom-0 my-1'></div> */}
    </div>
  );
};
// className=' rounded-full bg-schemes-light-primaryContainer text-schemes-light-onPrimaryContainer outline outline-schemes-light-outline  p-2.5 text-nowrap'>
export default Tabs;
