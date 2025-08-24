"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import FYI from "./FYI";

const Paths = memo(function Paa({ route, isActive, link }) {
 
  return (
    route && (
      <div className=" grid grid-flow-col auto-cols-max gap-1 items-center">
        <Link
          href={link}
          className={`${
            isActive ? " link-neutral" : "link-primary"
          } first-letter:uppercase`}
        >
          {decodeURI(route)}
        </Link>
        {!isActive && <span className=" group-last:hidden">&gt;</span>}
      </div>
    )
  );
});
const FooterPath = () => {
  const pathname = usePathname();
  const [path, setPath] = useState([]);
  useEffect(() => {
    if (!!pathname.length) setPath(pathname.split("/"));
    else setPath([]);
    return () => {
      setPath([]);
    };
  }, [pathname]);

  return (
    <div className="flex space-y-2 flex-col  px-4">
      <FYI category={pathname.split('/')[2]}/>
      <div className="divider"></div>
      <div className=" flex gap-1 items-center flex-wrap py-4 pt-0  text-sm">
        {path.map((entry, id) => {
         
          if (id !== path.length - 1) {
            return (
              <Paths
                key={id}
                link={id === 2 ? `/home?category=${path[2]}` : path.filter((_, ids) => ids <= id).join("/")}
                route={entry}
              />
            );
          } else {
            return (
              <Paths
                key={id}
                isActive={true}
                link={path.filter((_, id) => id <= id).join("/")}
                route={entry.includes("-") ? entry.split("-")[0] : entry}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FooterPath;
