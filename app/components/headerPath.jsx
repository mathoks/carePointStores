"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo, useEffect, useState } from "react";

const allowedPaths = [
    "home",
    "cart",
    "checkout",
    "complete-order",
    "All-categories",
    "Vitamins",
    "Weight-gainers",
    "Laxatives",
    "Food-suppliments",
    "Muscle-build",
    'Minerals',
    'Amino-acids',
    'Probiotics',
    'Enzymes',
    'Herbs and Biotanicals',
    'Omega-3-Fatty-Acids',
    'Blood-Tonics',
    'guest'
  ];
const Pathss = memo(function Paas({ route, isActive, link }) {
  const { data } = useSession();
 
  const links = [`${link}`, `${link}/${data?.user?.id}`];
  return (
    route && (
      <div className=" grid grid-flow-col auto-cols-max gap-1 items-center">
        <Link   
          href={
           route === "home"
              ? links[0]
              : route === "cart"
              ? links[1]
              : `${link}` 
          }
          className={`${
            !isActive ? " link-neutral" : "link-primary"
          } first-letter:uppercase`}
        >
          {allowedPaths.includes(route) ? decodeURI(route) : data?.user?.name?.split(' ')[0]?.toLowerCase()}
        </Link>
        {!isActive && <span className=" group-last:hidden">&gt;</span>}
      </div>
    )
  );
});
const HeaderPath = () => {
  const pathname = usePathname();
  const [path, setPath] = useState([]);
  
  useEffect(() => {
    if (!!pathname.length)
      setPath(
        pathname.split("/")
        // .filter((item) => allowedPaths.includes(item))
      );
    else setPath([]);
    return () => {
      setPath([]);
    };
  }, [pathname]);

  return (
      <div className=" flex gap-1 items-center flex-wrap py-4  px-2  text-sm bg-schemes-light-surface ">
        {path.map((entry, id) => {
          if (id !== path.length - 1) {
            return (
              <Pathss
                key={id}
                link={path.filter((_, ids) => ids <= id).join("/")}
                route={entry}
                isActive={false}
              />
            );
          } else {
            return (
              <Pathss
                key={id}
                isActive={true}
                link={path.filter((_, id) => id <= id).join("/")}
                route={entry}
              />
            );
          }
        })}
      </div>
  
  );
};

export default HeaderPath;
